#!/usr/bin/env node
/**
 * 批量配音生成脚本
 * 从文本文件读取，逐行生成配音
 * 用法: node batch-generate-voiceover.cjs <文本文件> [前缀]
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// 配置
const CHIRP_BIN = '/Volumes/My house/Users/Sheldon/go/bin/mcp-chirp3-go';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'voiceover');
const VOICE = 'cmn-CN-Chirp3-HD-Charon';

// 检查参数
if (process.argv.length < 3) {
    console.log('❌ 错误: 请提供文本文件');
    console.log('');
    console.log('用法:');
    console.log('  node batch-generate-voiceover.cjs <文本文件> [前缀]');
    console.log('');
    console.log('文本文件格式 (每行一个):');
    console.log('  大家好，我是 Sheldon');
    console.log('  今天我们来聊聊养虾');
    console.log('  ...');
    process.exit(1);
}

const inputFile = process.argv[2];
const prefix = process.argv[3] || 'scene';

// 检查文件是否存在
if (!fs.existsSync(inputFile)) {
    console.log('❌ 错误: 文件不存在:', inputFile);
    process.exit(1);
}

// 创建输出目录
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 读取文本文件
const lines = fs.readFileSync(inputFile, 'utf-8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

console.log('🎙️  批量配音生成');
console.log('================');
console.log('');
console.log('📖 输入文件:', inputFile);
console.log('📝 共', lines.length, '行文本');
console.log('🔊 语音:', VOICE);
console.log('📁 输出目录:', OUTPUT_DIR);
console.log('');

// 设置环境变量
process.env.PROJECT_ID = 'fluted-protocol-480308-p8';
process.env.GENMEDIA_BUCKET = 'bucket-0713';

// 生成配音的函数
function generateVoiceover(text, filename) {
    return new Promise((resolve, reject) => {
        const request = {
            jsonrpc: '2.0',
            id: 1,
            method: 'tools/call',
            params: {
                name: 'chirp_tts',
                arguments: {
                    text: text,
                    voice_name: VOICE,
                    output_directory: OUTPUT_DIR,
                    output_filename_prefix: filename
                }
            }
        };

        const chirp = spawn(CHIRP_BIN, [], {
            env: process.env,
            stdio: ['pipe', 'pipe', 'pipe']
        });

        let stdout = '';

        chirp.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        chirp.on('close', (code) => {
            const lines = stdout.split('\n').filter(line => line.trim());
            let response = null;

            for (const line of lines) {
                try {
                    const parsed = JSON.parse(line);
                    if (parsed.jsonrpc) {
                        response = parsed;
                        break;
                    }
                } catch (e) {}
            }

            if (response && response.result) {
                const content = response.result.content;
                if (content && content[0] && content[0].text) {
                    const resultText = content[0].text;
                    if (resultText.includes('saved to')) {
                        const match = resultText.match(/saved to: (.+\.wav)/);
                        if (match) {
                            const generatedFile = match[1];
                            const simpleName = path.join(OUTPUT_DIR, `${filename}.wav`);
                            try {
                                if (fs.existsSync(generatedFile)) {
                                    fs.renameSync(generatedFile, simpleName);
                                    resolve(simpleName);
                                    return;
                                }
                            } catch (e) {}
                        }
                    }
                }
            }
            reject(new Error('生成失败'));
        });

        chirp.stdin.write(JSON.stringify(request) + '\n');
        chirp.stdin.end();
    });
}

// 延迟函数
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 主函数
async function main() {
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const num = String(i + 1).padStart(2, '0');
        const filename = `${prefix}-${num}`;

        process.stdout.write(`[${i + 1}/${lines.length}] ${line.substring(0, 30)}${line.length > 30 ? '...' : ''} `);

        try {
            const outputPath = await generateVoiceover(line, filename);
            const stats = fs.statSync(outputPath);
            console.log(`✅ (${(stats.size / 1024).toFixed(0)}KB)`);
            successCount++;
        } catch (e) {
            console.log('❌');
            failCount++;
        }

        // 短暂延迟避免 API 限制
        if (i < lines.length - 1) {
            await delay(500);
        }
    }

    console.log('');
    console.log('================');
    console.log('✨ 批量生成完成!');
    console.log(`   ✅ 成功: ${successCount}`);
    if (failCount > 0) {
        console.log(`   ❌ 失败: ${failCount}`);
    }
    console.log('');
    console.log('📁 文件保存在:', OUTPUT_DIR);
}

main().catch(console.error);
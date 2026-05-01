#!/usr/bin/env node
/**
 * Google Chirp3-HD TTS 配音生成脚本
 * 使用方法: node generate-voiceover.cjs "要转换的文本" [输出文件名]
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
    console.log('❌ 错误: 请提供要转换的文本');
    console.log('');
    console.log('用法:');
    console.log('  node generate-voiceover.cjs "要转换的文本" [输出文件名]');
    console.log('');
    console.log('示例:');
    console.log('  node generate-voiceover.cjs "大家好，我是 Sheldon" intro');
    process.exit(1);
}

const text = process.argv[2];
const filename = process.argv[3] || 'voiceover';

// 设置环境变量
process.env.PROJECT_ID = 'fluted-protocol-480308-p8';
process.env.GENMEDIA_BUCKET = 'bucket-0713';

// 创建输出目录
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('🎙️  Google Chirp3-HD TTS');
console.log('========================');
console.log('');
console.log('📝 文本:', text);
console.log('🔊 语音:', VOICE);
console.log('📁 输出:', path.join(OUTPUT_DIR, `${filename}.wav`));
console.log('');

// 构建 JSON-RPC 请求
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

const requestJson = JSON.stringify(request);

// 调用 Chirp3 MCP
const chirp = spawn(CHIRP_BIN, [], {
    env: process.env,
    stdio: ['pipe', 'pipe', 'pipe']
});

let stdout = '';
let stderr = '';

chirp.stdout.on('data', (data) => {
    stdout += data.toString();
});

chirp.stderr.on('data', (data) => {
    stderr += data.toString();
});

chirp.on('close', (code) => {
    // 解析响应
    const lines = stdout.split('\n').filter(line => line.trim());
    let response = null;
    
    for (const line of lines) {
        try {
            const parsed = JSON.parse(line);
            if (parsed.jsonrpc) {
                response = parsed;
                break;
            }
        } catch (e) {
            // 忽略非 JSON 行
        }
    }
    
    if (response && response.result) {
        const content = response.result.content;
        if (content && content[0] && content[0].text) {
            const text = content[0].text;
            if (text.includes('saved to')) {
                console.log('✅ 配音生成成功!');
                console.log('');
                
                // 提取文件路径
                const match = text.match(/saved to: (.+\.wav)/);
                if (match) {
                    const generatedFile = match[1];
                    console.log('📄 文件:', generatedFile);
                    
                    // 简化文件名
                    const simpleName = path.join(OUTPUT_DIR, `${filename}.wav`);
                    try {
                        if (fs.existsSync(generatedFile)) {
                            fs.renameSync(generatedFile, simpleName);
                            const stats = fs.statSync(simpleName);
                            console.log('💾 大小:', (stats.size / 1024).toFixed(1) + ' KB');
                        }
                    } catch (e) {
                        // 忽略重命名错误
                    }
                }
                console.log('');
                console.log('✨ 完成!');
                return;
            }
        }
    }
    
    console.log('❌ 配音生成失败');
    if (stderr) console.log('错误:', stderr);
    if (stdout) console.log('输出:', stdout);
    process.exit(1);
});

// 发送请求 (添加换行符)
chirp.stdin.write(requestJson + '\n');
chirp.stdin.end();

#!/usr/bin/env node
/**
 * 列出可用的 Chirp3-HD 中文语音
 */

const { spawn } = require('child_process');

const CHIRP_BIN = '/Volumes/My house/Users/Sheldon/go/bin/mcp-chirp3-go';

process.env.PROJECT_ID = 'fluted-protocol-480308-p8';
process.env.GENMEDIA_BUCKET = 'bucket-0713';

const request = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
        name: 'list_chirp_voices',
        arguments: {
            language: 'Chinese'
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
    console.log('🔊 Google Chirp3-HD 中文语音列表');
    console.log('================================\n');

    const lines = stdout.split('\n').filter(line => line.trim());

    for (const line of lines) {
        try {
            const parsed = JSON.parse(line);
            if (parsed.jsonrpc && parsed.result) {
                const content = parsed.result.content;
                if (content && content[1] && content[1].text) {
                    const voices = JSON.parse(content[1].text);

                    console.log('推荐语音:\n');

                    // 只显示部分推荐的语音
                    const recommended = ['Charon', 'Achernar', 'Zephyr', 'Aoede', 'Orus'];

                    voices.forEach(voice => {
                        const voiceId = voice.name.replace('cmn-CN-Chirp3-HD-', '');
                        const isRecommended = recommended.includes(voiceId);

                        if (isRecommended) {
                            console.log(`  ${voice.name}`);
                            console.log(`    性别: ${voice.gender === 'MALE' ? '男声' : '女声'}${voiceId === 'Charon' ? ' ⭐ 推荐' : ''}`);
                            console.log('');
                        }
                    });

                    console.log(`共 ${voices.length} 个中文语音可用\n`);
                    console.log('💡 在 generate-voiceover.cjs 中修改 VOICE 变量来切换语音');
                }
            }
        } catch (e) {}
    }
});

chirp.stdin.write(JSON.stringify(request) + '\n');
chirp.stdin.end();
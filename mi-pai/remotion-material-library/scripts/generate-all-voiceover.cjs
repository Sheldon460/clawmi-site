#!/usr/bin/env node
/**
 * 批量生成配音 - Minimax TTS
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.MINIMAX_API_KEY || 'sk-api-58a4e96b1c6c4b4b8f8a9c7d6e5f4a3b';
const GROUP_ID = process.env.MINIMAX_GROUP_ID || '1904742886365216862';

const outputDir = path.join(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 读取配音脚本
const scriptsPath = path.join(__dirname, 'voiceover-scripts.json');
const scripts = JSON.parse(fs.readFileSync(scriptsPath, 'utf8'));

const generateAudio = async (key, config) => {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model: 'speech-01-turbo',
      text: config.text,
      voice_setting: {
        voice_id: config.voiceId || 'sheldon009'
      },
      speed: config.speed || 1.0,
      vol: 1.0,
      pitch: 0,
      audio_setting: {
        sample_rate: 32000,
        bitrate: 128000,
        format: 'mp3'
      }
    });

    const options = {
      hostname: 'api.minimax.chat',
      port: 443,
      path: `/v1/t2a_v2?GroupId=${GROUP_ID}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    console.log(`🎙️ 生成: ${key}`);
    console.log(`   内容: ${config.text.substring(0, 50)}...`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          if (response.base_resp?.status_code === 0 && response.data?.audio) {
            const audioData = Buffer.from(response.data.audio, 'hex');
            const outputPath = path.join(outputDir, `${key}.mp3`);
            fs.writeFileSync(outputPath, audioData);
            console.log(`   ✅ 已保存: ${outputPath}`);
            console.log(`   时长: ${response.extra_info?.audio_length}ms`);
            resolve({ key, duration: response.extra_info?.audio_length / 1000 });
          } else {
            console.log(`   ❌ 失败: ${response.base_resp?.status_msg}`);
            resolve({ key, duration: 0, error: response.base_resp?.status_msg });
          }
        } catch (err) {
          console.error(`   ❌ 错误: ${err.message}`);
          resolve({ key, duration: 0, error: err.message });
        }
      });
    });

    req.on('error', (err) => {
      console.error(`   ❌ 请求错误: ${err.message}`);
      resolve({ key, duration: 0, error: err.message });
    });
    
    req.write(payload);
    req.end();
  });
};

const main = async () => {
  console.log('🎙️ 开始批量生成配音...\n');
  
  const results = [];
  for (const [key, config] of Object.entries(scripts)) {
    const result = await generateAudio(key, config);
    results.push(result);
    // 避免请求过快
    await new Promise(r => setTimeout(r, 1500));
  }
  
  console.log('\n✅ 全部完成！');
  console.log('\n📊 结果汇总:');
  results.forEach(r => {
    if (r.duration > 0) {
      console.log(`  ${r.key}: ${r.duration.toFixed(2)}s`);
    } else {
      console.log(`  ${r.key}: ❌ ${r.error}`);
    }
  });
  
  // 保存时长配置
  const durations = {};
  results.forEach(r => {
    if (r.duration > 0) durations[r.key] = r.duration;
  });
  fs.writeFileSync(
    path.join(__dirname, 'audio-durations.json'),
    JSON.stringify(durations, null, 2)
  );
  console.log('\n💾 时长配置已保存到: scripts/audio-durations.json');
};

main().catch(console.error);

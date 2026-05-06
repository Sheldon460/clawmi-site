#!/usr/bin/env node
/**
 * Minimax TTS 配音生成脚本
 * 功能: 从 voiceover-scripts.json 读取文案，批量生成配音文件
 * 使用: node scripts/generate-tts-minimax.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// API 配置
const API_KEY = process.env.MINIMAX_API_KEY;
const GROUP_ID = process.env.MINIMAX_GROUP_ID;
const API_HOST = 'api.minimax.chat';  // ⚠️ 注意域名！

// 音频配置
const AUDIO_DIR = './public/audio';
const SCRIPTS_FILE = './scripts/voiceover-scripts.json';

// 默认配音配置
const DEFAULT_CONFIG = {
  model: 'speech-01-turbo',
  voice_setting: {
    voice_id: 'sheldon009'
  },
  speed: 1.0,
  vol: 1.0,
  pitch: 0
};

/**
 * 调用 Minimax TTS API
 */
const generateAudio = async (text, outputPath, config = {}) => {
  return new Promise((resolve, reject) => {
    const payload = {
      ...DEFAULT_CONFIG,
      ...config,
      text: text
    };

    const postData = JSON.stringify(payload);

    const options = {
      hostname: API_HOST,
      port: 443,
      path: `/v1/t2a_pro?GroupId=${GROUP_ID}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      
      res.on('data', (chunk) => {
        chunks.push(chunk);
      });
      
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        
        if (res.statusCode === 200) {
          // 检查是否是 JSON 错误响应
          const contentType = res.headers['content-type'] || '';
          if (contentType.includes('application/json')) {
            const json = JSON.parse(buffer.toString());
            if (json.base_resp && json.base_resp.status_code !== 0) {
              reject(new Error(`API Error: ${json.base_resp.status_msg}`));
              return;
            }
          }
          
          // 保存音频文件
          fs.writeFileSync(outputPath, buffer);
          resolve(outputPath);
        } else {
          const error = buffer.toString();
          reject(new Error(`HTTP ${res.statusCode}: ${error}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
};

/**
 * 主函数
 */
const main = async () => {
  console.log('🎙️ Minimax TTS 配音生成器\n');
  
  // 检查 API 配置
  if (!API_KEY) {
    console.error('❌ MINIMAX_API_KEY 未设置');
    console.log('提示: export MINIMAX_API_KEY="sk-api-..."');
    process.exit(1);
  }
  
  if (!GROUP_ID) {
    console.error('❌ MINIMAX_GROUP_ID 未设置');
    console.log('提示: export MINIMAX_GROUP_ID="1904742886365216862"');
    process.exit(1);
  }
  
  console.log(`📡 API Host: ${API_HOST}`);
  console.log(`🔑 API Key: ${API_KEY.substring(0, 10)}...`);
  console.log(`👥 Group ID: ${GROUP_ID}\n`);
  
  // 检查配音脚本文件
  if (!fs.existsSync(SCRIPTS_FILE)) {
    console.error(`❌ 配音脚本文件不存在: ${SCRIPTS_FILE}`);
    console.log('提示: 创建 scripts/voiceover-scripts.json');
    process.exit(1);
  }
  
  // 读取配音脚本
  const scripts = JSON.parse(fs.readFileSync(SCRIPTS_FILE, 'utf8'));
  const entries = Object.entries(scripts);
  
  console.log(`📝 找到 ${entries.length} 条配音文案\n`);
  
  // 创建音频目录
  if (!fs.existsSync(AUDIO_DIR)) {
    fs.mkdirSync(AUDIO_DIR, { recursive: true });
  }
  
  // 批量生成
  for (const [name, config] of entries) {
    const outputPath = path.join(AUDIO_DIR, `${name}.mp3`);
    
    console.log(`🎙️ 正在生成: ${name}`);
    console.log(`   文案: ${config.text.substring(0, 50)}...`);
    
    try {
      await generateAudio(config.text, outputPath, {
        voice_setting: {
          voice_id: config.voiceId || DEFAULT_CONFIG.voice_setting.voice_id
        },
        speed: config.speed || DEFAULT_CONFIG.speed,
        vol: config.vol || DEFAULT_CONFIG.vol
      });
      
      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`   ✅ 已保存: ${outputPath} (${sizeKB} KB)\n`);
    } catch (error) {
      console.error(`   ❌ 生成失败: ${error.message}\n`);
    }
  }
  
  console.log('🎉 配音生成完成！');
  console.log('\n📋 下一步操作:');
  console.log('  1. 运行时长配置: node scripts/auto-config.js');
  console.log('  2. 运行预检查: node scripts/pre-check.js');
  console.log('  3. 渲染视频: npm run build\n');
};

main().catch(console.error);
#!/usr/bin/env node
/**
 * Minimax TTS 配音生成脚本
 * 使用方法: node generate-voiceover.cjs
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// 配音稿配置
const scripts = {
  'voiceover-1': {
    text: '我是Sheldon，今天是7天分享的最后一天。之前所有理论和技巧，最终都要落实到搞钱和涨粉上。',
    voiceId: 'sheldon009',
  },
  'voiceover-2': {
    text: '对于自媒体人来说，最直接的生产力就是素材库。今天我把这套压箱底的实战流程，毫无保留地分享给你。',
    voiceId: 'sheldon009',
  },
  'voiceover-3': {
    text: '为什么你总是选题荒？大多数人的选题是刷朋友圈、刷小红书时随手存的。这叫碎片化堆积，真正要写的时候根本找不到。',
    voiceId: 'sheldon009',
  },
  'voiceover-4': {
    text: '我们需要的是一个流动的淡水库。它能不断吸纳新信息，又能自动过滤掉死水。',
    voiceId: 'sheldon009',
  },
  'voiceover-5': {
    text: '我的爆款素材库闭环流程有四步。第一步全网监控，配置监控虾盯着20个头部账号，新内容自动抓取。',
    voiceId: 'sheldon009',
  },
  'voiceover-6': {
    text: '第二步热度初筛，AI自动判断选题是否符合我的定位。不符合的过滤掉，符合的进入下一关。',
    voiceId: 'sheldon009',
  },
  'voiceover-7': {
    text: '第三步自动预处理，AI把爆款文章拆解成核心逻辑、情绪钩子、金句提炼，甚至预演我会怎么写。',
    voiceId: 'sheldon009',
  },
  'voiceover-8': {
    text: '第四步同步存档，处理完的内容自动进入飞书多维表格或Obsidian，按标签分类管理。',
    voiceId: 'sheldon009',
  },
  'voiceover-9': {
    text: '用了这套系统，我的工作状态彻底变了。以前我是找选题，现在我是挑选题。每天早上素材库里已经有十几条预处理好的新鲜选题。',
    voiceId: 'sheldon009',
  },
  'voiceover-10': {
    text: '创作的本质不是从零到一的虚空创造，而是从一到一百的整合优化。自动化素材库帮你完成了最枯燥的零到一，你只需要注入灵魂和风格。',
    voiceId: 'sheldon009',
  },
};

// API 配置
const API_KEY = process.env.MINIMAX_API_KEY;
const GROUP_ID = process.env.MINIMAX_GROUP_ID;
const API_HOST = 'api.minimax.chat';

if (!API_KEY || !GROUP_ID) {
  console.error('❌ 错误: 请设置 MINIMAX_API_KEY 和 MINIMAX_GROUP_ID 环境变量');
  process.exit(1);
}

// 确保目录存在
const outputDir = path.join(__dirname, '..', 'public', 'voiceover');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 生成单个配音
async function generateVoiceover(name, config) {
  console.log(`\n🎙️  正在生成: ${name}`);
  console.log(`   文本: ${config.text.substring(0, 50)}...`);
  
  // Minimax API v2 请求体 - 正确的参数格式
  const payload = JSON.stringify({
    model: 'speech-01-turbo',
    text: config.text,
    voice_setting: {
      voice_id: config.voiceId
    },
    speed: 1.0,
    vol: 1.0,
    pitch: 0
  });
  
  const options = {
    hostname: API_HOST,
    port: 443,
    path: `/v1/t2a_v2?GroupId=${GROUP_ID}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Length': Buffer.byteLength(payload),
    },
  };
  
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.base_resp?.status_code !== 0) {
            reject(new Error(`API Error: ${response.base_resp?.status_msg || 'Unknown error'}`));
            return;
          }
          
          // 解码并保存音频 (hex to buffer)
          const audioHex = response.data?.audio;
          if (!audioHex) {
            reject(new Error('No audio data in response'));
            return;
          }
          
          const audioData = Buffer.from(audioHex, 'hex');
          const outputPath = path.join(outputDir, `${name}.mp3`);
          fs.writeFileSync(outputPath, audioData);
          
          const duration = response.extra_info?.audio_length || 0;
          console.log(`   ✅ 已保存: ${outputPath}`);
          console.log(`   📊 音频时长: ${(duration / 1000).toFixed(2)}s`);
          resolve({ name, duration: duration / 1000 });
        } catch (err) {
          reject(err);
        }
      });
    });
    
    req.on('error', (err) => reject(new Error(`Request failed: ${err.message}`)));
    req.write(payload);
    req.end();
  });
}

// 主函数
async function main() {
  console.log('🚀 Minimax TTS 配音生成器');
  console.log(`📁 输出目录: ${outputDir}`);
  console.log(`🔑 API Key: ${API_KEY.substring(0, 20)}...`);
  console.log(`🏢 Group ID: ${GROUP_ID}`);
  
  const results = [];
  
  for (const [name, config] of Object.entries(scripts)) {
    try {
      const result = await generateVoiceover(name, config);
      results.push(result);
    } catch (err) {
      console.error(`   ❌ 失败: ${err.message}`);
    }
  }
  
  console.log('\n📋 生成完成:');
  console.log('='.repeat(50));
  results.forEach(r => {
    console.log(`  ${r.name}: ${r.duration.toFixed(2)}s`);
  });
  console.log('='.repeat(50));
  console.log(`  总计: ${results.length} 个文件`);
  
  // 生成时长配置文件
  const durationConfig = results.map(r => `  ${r.name.replace('voiceover-', 'v')}: ${r.duration.toFixed(2)},`).join('\n');
  console.log('\n📊 时长配置 (用于更新视频代码):');
  console.log('const VOICE_DURATION = {');
  console.log(durationConfig);
  console.log('};');
}

main().catch(console.error);

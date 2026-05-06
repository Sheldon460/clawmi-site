#!/usr/bin/env node
/**
 * Minimax TTS 配音生成脚本 - 正确版本
 * 域名: api.minimax.chat (注意不是 minimaxi)
 * 音色: sheldon009
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// API 配置 - 从环境变量读取
const API_KEY = process.env.MINIMAX_API_KEY;
const GROUP_ID = process.env.MINIMAX_GROUP_ID || '1904742886365216862';
const API_HOST = 'api.minimax.chat';  // ✅ 正确域名

// 输出目录
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'audio');

// 配音脚本
const SCRIPTS = {
  "scene-01": {
    text: "终极揭秘：如何用 OpenClaw 搭建爆款素材库，实现选题自由。我是 Sheldon，今天是我们 7 天分享的最后一天。",
    voiceId: "sheldon009",
    speed: 1.0
  },
  "scene-02": {
    text: "为什么你总是选题荒？大多数人的选题是刷朋友圈、刷小红书时随手存的，这叫碎片化堆积。真正需要的是流动的淡水库，能源源不断吸纳新信息，又能自动过滤死水。",
    voiceId: "sheldon009",
    speed: 1.0
  },
  "scene-03": {
    text: "我的爆款素材库闭环流程有四步。第一步，全网监控。配置监控虾盯着 20 个头部账号，新内容自动抓取。第二步，热度初筛。AI 判断选题是否符合我的定位，不符合直接过滤。第三步，自动预处理。AI 拆解爆款文章的核心逻辑、情绪钩子、金句提炼，甚至预演我会怎么写。第四步，同步存档。处理完的内容自动同步到飞书多维表格或 Obsidian，按标签分类。",
    voiceId: "sheldon009",
    speed: 1.0
  },
  "scene-04": {
    text: "用了这套系统，我的工作状态彻底变了。以前我是找选题，现在我是挑选题。每天早上打开素材库，十几条预处理好的新鲜选题等着我。",
    voiceId: "sheldon009",
    speed: 1.0
  },
  "scene-05": {
    text: "创作的本质，不是从零到一的虚空创造，而是从一到一百的整合优化。自动化素材库帮你完成了最枯燥的零到一，你只需要注入灵魂和风格。",
    voiceId: "sheldon009",
    speed: 1.0
  }
};

/**
 * 调用 Minimax TTS API
 */
async function generateAudio(key, config) {
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
      hostname: API_HOST,
      port: 443,
      path: `/v1/t2a_v2?GroupId=${GROUP_ID}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    console.log(`🎙️  生成: ${key}`);
    console.log(`   文案: ${config.text.substring(0, 40)}...`);

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          if (response.base_resp?.status_code === 0 && response.data?.audio) {
            // 解码 hex 音频数据
            const audioBuffer = Buffer.from(response.data.audio, 'hex');
            const outputPath = path.join(OUTPUT_DIR, `${key}.mp3`);
            
            fs.writeFileSync(outputPath, audioBuffer);
            
            const duration = (response.extra_info?.audio_length || 0) / 1000;
            console.log(`   ✅ 成功: ${outputPath}`);
            console.log(`   时长: ${duration.toFixed(1)}s\n`);
            
            resolve({ key, success: true, duration, path: outputPath });
          } else {
            const error = response.base_resp?.status_msg || 'Unknown error';
            console.log(`   ❌ 失败: ${error}\n`);
            resolve({ key, success: false, error });
          }
        } catch (err) {
          console.log(`   ❌ 解析错误: ${err.message}\n`);
          resolve({ key, success: false, error: err.message });
        }
      });
    });

    req.on('error', (err) => {
      console.log(`   ❌ 请求错误: ${err.message}\n`);
      resolve({ key, success: false, error: err.message });
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log('🎙️ Minimax TTS 配音生成器');
  console.log(`📡 API: ${API_HOST}`);
  console.log(`🔑 Key: ${API_KEY ? API_KEY.substring(0, 15) + '...' : '未设置'}\n`);
  
  // 检查 API Key
  if (!API_KEY) {
    console.error('❌ 请设置 MINIMAX_API_KEY 环境变量');
    console.log('\n用法:');
    console.log('  export MINIMAX_API_KEY="eyJhbGci..."');
    console.log('  node scripts/generate-voiceover.cjs\n');
    process.exit(1);
  }
  
  // 确保输出目录存在
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // 批量生成
  const results = [];
  for (const [key, config] of Object.entries(SCRIPTS)) {
    const result = await generateAudio(key, config);
    results.push(result);
    await new Promise(r => setTimeout(r, 1000)); // 避免请求过快
  }
  
  // 汇总结果
  console.log('📊 生成结果汇总:');
  let totalDuration = 0;
  
  for (const r of results) {
    if (r.success) {
      console.log(`  ✅ ${r.key}: ${r.duration.toFixed(1)}s`);
      totalDuration += r.duration;
    } else {
      console.log(`  ❌ ${r.key}: ${r.error}`);
    }
  }
  
  console.log(`\n⏱️  总时长: ${totalDuration.toFixed(1)}s`);
  
  // 生成时长配置
  const durations = {};
  for (const r of results) {
    if (r.success) {
      durations[r.key] = Math.round(r.duration * 10) / 10;
    }
  }
  
  const configPath = path.join(__dirname, 'audio-durations.json');
  fs.writeFileSync(configPath, JSON.stringify(durations, null, 2));
  console.log(`\n💾 时长配置: ${configPath}`);
  
  console.log('\n📝 请更新 src/config.ts:');
  console.log('export const ESTIMATED_DURATIONS = {');
  for (const [k, v] of Object.entries(durations)) {
    console.log(`  "${k}": ${v},`);
  }
  console.log('};');
}

main().catch(console.error);
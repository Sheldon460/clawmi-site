#!/usr/bin/env node
/**
 * Remotion 渲染前预检查脚本
 * 功能: 检查渲染所需的所有条件是否满足
 * 使用: node scripts/pre-check.js
 */

const fs = require('fs');
const { execSync } = require('child_process');

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
};

const check = {
  apiKey: () => {
    const key = process.env.MINIMAX_API_KEY;
    const groupId = process.env.MINIMAX_GROUP_ID;
    
    if (!key) {
      return { pass: false, msg: 'MINIMAX_API_KEY 未设置' };
    }
    if (!key.startsWith('sk-api-')) {
      return { pass: false, msg: 'API Key 格式错误（应以 sk-api- 开头）' };
    }
    if (!groupId) {
      return { pass: false, msg: 'MINIMAX_GROUP_ID 未设置' };
    }
    return { pass: true, msg: 'API Key 配置正确' };
  },
  
  audioDir: () => {
    const audioDir = './public/audio';
    if (!fs.existsSync(audioDir)) {
      return { pass: false, msg: 'public/audio 目录不存在' };
    }
    return { pass: true, msg: 'public/audio 目录存在' };
  },
  
  audioFiles: () => {
    const audioDir = './public/audio';
    if (!fs.existsSync(audioDir)) {
      return { pass: false, msg: '目录不存在' };
    }
    const files = fs.readdirSync(audioDir).filter(f => 
      f.startsWith('voiceover-') && f.match(/\.(mp3|wav|m4a)$/)
    );
    if (files.length === 0) {
      return { pass: false, msg: '没有找到配音文件（voiceover-*.mp3）' };
    }
    return { pass: true, msg: `找到 ${files.length} 个配音文件` };
  },
  
  bgmFile: () => {
    const bgmPath = './public/audio/bgm.mp3';
    if (!fs.existsSync(bgmPath)) {
      return { pass: false, msg: 'BGM 文件不存在（public/audio/bgm.mp3）' };
    }
    const stats = fs.statSync(bgmPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    return { pass: true, msg: `BGM 文件存在 (${sizeMB} MB)` };
  },
  
  durationConfig: () => {
    if (!fs.existsSync('./src/duration-config.ts')) {
      return { pass: false, msg: '时长配置未生成（运行 node scripts/auto-config.js）' };
    }
    return { pass: true, msg: '时长配置已生成' };
  },
  
  remotionConfig: () => {
    if (!fs.existsSync('./remotion.config.ts')) {
      return { pass: false, msg: 'remotion.config.ts 不存在' };
    }
    return { pass: true, msg: 'remotion.config.ts 存在' };
  },
  
  mainVideo: () => {
    if (!fs.existsSync('./src/compositions/MainVideo.tsx')) {
      return { pass: false, msg: 'MainVideo.tsx 不存在' };
    }
    
    const content = fs.readFileSync('./src/compositions/MainVideo.tsx', 'utf8');
    const hasBGM = content.includes('Audio') && content.includes('bgm');
    const hasSubtitle = content.includes('SubtitleTrack');
    
    let msg = 'MainVideo.tsx 存在';
    if (!hasBGM) msg += ' ⚠️ 未检测到 BGM';
    if (!hasSubtitle) msg += ' ⚠️ 未检测到字幕';
    
    return { pass: true, msg };
  },
  
  subtitleComponent: () => {
    if (!fs.existsSync('./src/components/SubtitleTrack.tsx')) {
      return { pass: false, msg: '字幕组件不存在（src/components/SubtitleTrack.tsx）' };
    }
    return { pass: true, msg: '字幕组件存在' };
  },
  
  ports: () => {
    try {
      const result = execSync('lsof -ti:3000,3001 2>/dev/null || true', { encoding: 'utf8' }).trim();
      if (result) {
        return { pass: false, msg: `端口被占用 (PID: ${result.replace(/\n/g, ', ')})` };
      }
      return { pass: true, msg: '端口 3000/3001 可用' };
    } catch (e) {
      return { pass: true, msg: '端口检查通过' };
    }
  },
};

const main = () => {
  console.log('🔍 Remotion 渲染前预检查\n');
  console.log('=' .repeat(50) + '\n');
  
  const results = [];
  let passCount = 0;
  let failCount = 0;
  
  const checks = [
    { name: 'API Key', fn: check.apiKey },
    { name: '音频目录', fn: check.audioDir },
    { name: '配音文件', fn: check.audioFiles },
    { name: 'BGM 文件', fn: check.bgmFile },
    { name: '时长配置', fn: check.durationConfig },
    { name: 'Remotion 配置', fn: check.remotionConfig },
    { name: '主视频组件', fn: check.mainVideo },
    { name: '字幕组件', fn: check.subtitleComponent },
    { name: '端口状态', fn: check.ports },
  ];
  
  checks.forEach(({ name, fn }) => {
    const result = fn();
    const icon = result.pass ? '✅' : '❌';
    const color = result.pass ? colors.green : colors.red;
    
    console.log(`${icon} ${name}: ${result.msg}`);
    
    if (result.pass) {
      passCount++;
    } else {
      failCount++;
    }
  });
  
  console.log('\n' + '='.repeat(50));
  console.log(`\n📊 检查结果: ${colors.green}${passCount} 通过${colors.reset} / ${failCount > 0 ? colors.red : colors.green}${failCount} 失败${colors.reset}\n`);
  
  if (failCount > 0) {
    console.log('❌ 存在未通过项，请修复后再渲染\n');
    process.exit(1);
  } else {
    console.log('✅ 所有检查通过，可以开始渲染\n');
    console.log('🚀 执行命令: npm run build\n');
  }
};

main();
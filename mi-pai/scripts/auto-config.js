#!/usr/bin/env node
/**
 * 自动时长配置生成器
 * 功能: 分析 public/audio/ 目录下的配音文件，自动生成时长配置
 * 使用: node scripts/auto-config.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const getDuration = (file) => {
  try {
    const cmd = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${file}"`;
    const result = execSync(cmd, { encoding: 'utf8' }).trim();
    return parseFloat(result);
  } catch (e) {
    console.error(`❌ 无法获取时长: ${file}`);
    console.error(e.message);
    return 0;
  }
};

const main = () => {
  console.log('🎬 Remotion 自动时长配置生成器\n');
  
  const audioDir = './public/audio';
  
  // 检查目录
  if (!fs.existsSync(audioDir)) {
    console.error('❌ public/audio 目录不存在');
    console.log('提示: 请先创建目录 mkdir -p public/audio');
    process.exit(1);
  }

  // 查找配音文件
  const files = fs.readdirSync(audioDir)
    .filter(f => f.startsWith('voiceover-') && f.match(/\.(mp3|wav|m4a)$/))
    .sort();

  if (files.length === 0) {
    console.error('❌ 没有找到配音文件');
    console.log('提示: 配音文件需以 voiceover- 开头，支持 mp3/wav/m4a 格式');
    process.exit(1);
  }

  console.log(`📂 找到 ${files.length} 个配音文件:\n`);

  const durations = {};
  files.forEach((file, index) => {
    const duration = getDuration(path.join(audioDir, file));
    durations[`v${index + 1}`] = duration;
    console.log(`  ✅ ${file}: ${duration.toFixed(2)}s (${Math.ceil(duration * 30)} 帧)`);
  });

  // 计算总时长
  const totalDuration = Object.values(durations).reduce((a, b) => a + b, 0);
  const totalFrames = Math.ceil(totalDuration * 30);
  
  console.log(`\n📊 总时长: ${totalDuration.toFixed(2)}s (${totalFrames} 帧)\n`);

  // 生成配置文件
  const configContent = `// 自动生成的时长配置
// 生成时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
// 文件数量: ${files.length}

export const VOICE_DURATIONS = ${JSON.stringify(durations, null, 2)};

// 转换为帧数 (30fps)
export const VOICE_FRAMES = {
${Object.entries(durations).map(([k, v]) => 
  `  ${k}: ${Math.ceil(v * 30)}, // ${v.toFixed(2)}s`
).join('\n')}
};

// 总时长
export const TOTAL_DURATION = ${totalDuration.toFixed(2)};
export const TOTAL_FRAMES = ${totalFrames};

// 时间轴配置（自动计算）
export const TIMELINE = {
${Object.entries(durations).reduce((acc, [k, v], i, arr) => {
  const prevFrames = arr.slice(0, i).reduce((sum, [, dur]) => sum + Math.ceil(dur * 30), 0);
  const frames = Math.ceil(v * 30);
  acc.push(`  ${k}: { from: ${prevFrames}, duration: ${frames}, to: ${prevFrames + frames} },`);
  return acc;
}, []).join('\n')}
};
`;

  fs.writeFileSync('./src/duration-config.ts', configContent);
  console.log('✅ 时长配置已生成: src/duration-config.ts\n');
  
  // 生成检查清单
  console.log('📋 下一步操作:');
  console.log('  1. 确认 BGM 文件: public/audio/bgm.mp3');
  console.log('  2. 更新字幕内容: src/components/SubtitleTrack.tsx');
  console.log('  3. 运行预检查: node scripts/pre-check.js');
  console.log('  4. 渲染视频: npm run build\n');
};

main();
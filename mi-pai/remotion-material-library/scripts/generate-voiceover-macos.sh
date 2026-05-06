#!/bin/bash
# 使用 macOS say 命令生成配音（临时方案）

OUTPUT_DIR="/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-pai/remotion-material-library/public/audio"
SCRIPTS_FILE="/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-pai/remotion-material-library/scripts/voiceover-scripts.json"

echo "🎙️ 使用 macOS say 生成配音..."

# 读取 JSON 并生成音频
node -e "
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const scripts = JSON.parse(fs.readFileSync('$SCRIPTS_FILE', 'utf8'));
const outputDir = '$OUTPUT_DIR';

// 创建输出目录
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const results = {};

for (const [key, config] of Object.entries(scripts)) {
  const text = config.text;
  const outputPath = path.join(outputDir, key + '.mp3');
  
  console.log('🎙️ 生成:', key);
  console.log('   内容:', text.substring(0, 50) + '...');
  
  try {
    // 使用 say 命令生成 aiff，然后转换为 mp3
    const aiffPath = outputPath.replace('.mp3', '.aiff');
    execSync(\`say -o '\${aiffPath}' -v Ting-Ting '\${text.replace(/'/g, \"'\\'\"\`)}'\`, { stdio: 'inherit' });
    
    // 转换为 mp3
    execSync(\`ffmpeg -y -i '\${aiffPath}' -ar 44100 -ac 1 -b:a 56k '\${outputPath}' 2>/dev/null\`);
    
    // 删除临时 aiff
    fs.unlinkSync(aiffPath);
    
    // 获取时长
    const durationOutput = execSync(\`ffprobe -v quiet -show_format -of csv=p=0:nk=1 -d 0 '\${outputPath}' 2>/dev/null | head -1\`, { encoding: 'utf8' });
    const duration = parseFloat(durationOutput) || 0;
    
    results[key] = duration;
    console.log('   ✅ 已保存:', outputPath);
    console.log('   时长:', duration.toFixed(2) + 's');
  } catch (err) {
    console.log('   ❌ 失败:', err.message);
    results[key] = 0;
  }
}

// 保存时长配置
fs.writeFileSync(
  path.join(path.dirname('$SCRIPTS_FILE'), 'audio-durations.json'),
  JSON.stringify(results, null, 2)
);

console.log('\n✅ 全部完成！');
console.log('\n📊 结果汇总:');
for (const [key, duration] of Object.entries(results)) {
  if (duration > 0) {
    console.log('  ' + key + ': ' + duration.toFixed(2) + 's');
  } else {
    console.log('  ' + key + ': ❌ 失败');
  }
}
"

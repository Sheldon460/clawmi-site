// 甲骨文裁员启示录 - 配音生成脚本

const fs = require('fs');
const https = require('https');

const API_KEY = process.env.MINIMAX_API_KEY;
const GROUP_ID = "1904742886365216862";

if (!API_KEY) {
  console.error('请设置 MINIMAX_API_KEY 环境变量');
  process.exit(1);
}

const scripts = require('./voiceover-scripts.json');
const AUDIO_DIR = 'public/audio';

// 创建音频目录
if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

function generateVoiceover(sceneId, text, voiceId, speed) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model: 'speech-01-turbo',
      text: text,
      voice_setting: {
        voice_id: voiceId
      },
      speed: speed,
      vol: 1.0,
      pitch: 0,
      audio_setting: {
        sample_rate: 32000,
        bitrate: 128000,
        format: 'mp3'
      }
    });

    const options = {
      hostname: "api.minimax.chat",
      port: 443,
      path: `/v1/t2a_v2?GroupId=${GROUP_ID}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    console.log(`🎙️ 生成 ${sceneId}...`);

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
            const outputPath = `${AUDIO_DIR}/${sceneId}.mp3`;

            fs.writeFileSync(outputPath, audioBuffer);

            const duration = (response.extra_info?.audio_length || 0) / 1000;
            console.log(`✅ ${sceneId} 生成完成 (${Math.round(audioBuffer.length / 1024)}KB, ${duration.toFixed(1)}s)`);
            resolve({ sceneId, size: audioBuffer.length, duration });
          } else {
            const error = response.base_resp?.status_msg || 'Unknown error';
            console.error(`❌ ${sceneId} 失败:`, error);
            reject(new Error(error));
          }
        } catch (err) {
          console.error(`❌ ${sceneId} 解析错误:`, err.message);
          reject(err);
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ ${sceneId} 请求失败:`, error.message);
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log('🎙️ 开始生成配音...\n');

  const results = [];
  for (const [sceneId, config] of Object.entries(scripts)) {
    try {
      const result = await generateVoiceover(
        sceneId,
        config.text,
        config.voiceId,
        config.speed
      );
      results.push(result);

      // 避免API限流
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`生成 ${sceneId} 失败:`, error);
    }
  }

  console.log('\n📊 所有配音生成完成！');
  console.log(`✅ 成功: ${results.length}/${Object.keys(scripts).length} 个场景`);

  // 输出时长配置
  const durations = {};
  results.forEach(r => {
    durations[r.sceneId] = Math.round(r.duration * 10) / 10;
  });

  console.log('\n⏱️  时长配置:');
  console.log('export const ESTIMATED_DURATIONS = {');
  for (const [k, v] of Object.entries(durations)) {
    console.log(`  "${k}": ${v},`);
  }
  console.log('};');
}

main();

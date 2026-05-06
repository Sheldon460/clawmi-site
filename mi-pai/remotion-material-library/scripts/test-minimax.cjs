#!/usr/bin/env node
const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.MINIMAX_API_KEY || 'sk-api-6SUheWyeLR7VDODrdPPblE1gDmkkwP6mbtUohxu84_KEGfMBTqcD2SYDL-HHi0V6MXWKRteFzphH74Mc4L81Ym8CW6hBdsrmMDlnVBltKJoPZiJmiNX745s';
const GROUP_ID = process.env.MINIMAX_GROUP_ID || '1904742886365216862';

const outputDir = path.join(__dirname, '..', 'public', 'voiceover');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const text = '你好，这是一个测试';

const payload = JSON.stringify({
  model: 'speech-01-turbo',
  text: text,
  voice_setting: {
    voice_id: 'sheldon009'
  },
  speed: 1.0,
  vol: 1.0,
  pitch: 0
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

console.log('Testing Minimax API...');
console.log('Payload:', payload);

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('Response:', JSON.stringify(response, null, 2));
      
      if (response.base_resp?.status_code === 0 && response.data?.audio) {
        const audioData = Buffer.from(response.data.audio, 'hex');
        const outputPath = path.join(outputDir, 'test.mp3');
        fs.writeFileSync(outputPath, audioData);
        console.log('✅ Audio saved to:', outputPath);
        console.log('Duration:', response.extra_info?.audio_length, 'ms');
      } else {
        console.log('❌ API Error:', response.base_resp?.status_msg);
      }
    } catch (err) {
      console.error('Error:', err.message);
      console.log('Raw response:', data.substring(0, 500));
    }
  });
});

req.on('error', (err) => console.error('Request error:', err.message));
req.write(payload);
req.end();

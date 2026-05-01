#!/usr/bin/env node
/**
 * Hacker News 热帖采集脚本
 * 用法：node hn-digest.js [数量] [主题过滤]
 * 示例：node hn-digest.js 10 AI
 */

const https = require('https');

// HN API 端点
const HN_API = 'https://hacker-news.firebaseio.com/v0';

// 主题关键词映射
const TOPIC_FILTERS = {
  'tech': ['tech', 'technology', 'software', 'hardware', 'programming', 'code', 'developer', 'engineering'],
  'health': ['health', 'medical', 'medicine', 'healthcare', 'biotech', 'biology', 'drug', 'vaccine'],
  'AI': ['AI', 'artificial intelligence', 'machine learning', 'deep learning', 'neural network', 'LLM', 'GPT', 'Claude', 'OpenAI', 'Anthropic', 'model', 'training', 'inference']
};

// 获取 HN 热帖 ID 列表
async function getTopStories(limit = 30) {
  return new Promise((resolve, reject) => {
    const url = `${HN_API}/topstories.json`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const stories = JSON.parse(data);
          resolve(stories.slice(0, limit));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// 获取单条帖子详情
async function getStory(id) {
  return new Promise((resolve, reject) => {
    const url = `${HN_API}/item/${id}.json`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const story = JSON.parse(data);
          resolve(story);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// 检查标题是否匹配主题
function matchesTopic(title, topic) {
  if (!topic || !TOPIC_FILTERS[topic]) return true;
  
  const lowerTitle = title.toLowerCase();
  return TOPIC_FILTERS[topic].some(keyword => 
    lowerTitle.includes(keyword.toLowerCase())
  );
}

// 格式化输出
function formatStory(story, index) {
  const score = story.score || 0;
  const comments = story.descendants || 0;
  const url = story.url || `https://news.ycombinator.com/item?id=${story.id}`;
  
  return `${index}. ${story.title}
   🔗 ${url}
   👍 ${score} points | 💬 ${comments} comments
`;
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  const limit = parseInt(args[0]) || 10;
  const topic = args[1];
  
  console.log(`🤖 Fetching Hacker News ${topic ? `(${topic}) ` : ''}Top Stories...\n`);
  
  try {
    // 获取热帖 ID
    const storyIds = await getTopStories(100); // 获取更多以便过滤
    
    // 获取详情并过滤
    const stories = [];
    for (const id of storyIds) {
      if (stories.length >= limit) break;
      
      const story = await getStory(id);
      if (story && story.title && matchesTopic(story.title, topic)) {
        stories.push(story);
      }
    }
    
    // 输出结果
    console.log(`🌟 Hacker News ${topic ? `${topic} ` : ''}Digest\n`);
    console.log('='.repeat(50));
    
    stories.forEach((story, i) => {
      console.log(formatStory(story, i + 1));
    });
    
    console.log('='.repeat(50));
    console.log(`\n✅ Fetched ${stories.length} stories${topic ? ` matching "${topic}"` : ''}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();

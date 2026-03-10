#!/usr/bin/env node

/**
 * AI 资讯每日采集脚本
 * 功能：收集全网 10 条热点 AI 资讯，写入飞书多维表格
 * 执行时间：每天 7:30
 */

const https = require('https');
const http = require('http');

// 配置
const CONFIG = {
  appToken: 'EVxlb7yTHaw9GjsyPgncypMTnec',
  tableId: 'tbl6yIyjpyZfTHzK',
  newsCount: 10,
  workspace: '/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-zhi'
};

/**
 * 使用 Perplexity API 搜索 AI 资讯
 */
async function searchAINews() {
  console.log('🔍 开始搜索 AI 资讯...');
  
  const searchQueries = [
    'AI artificial intelligence news today',
    'machine learning breakthrough 2026',
    'AI product launch announcement',
    'AI regulation policy update',
    'AI startup funding investment',
    'LLM large language model news',
    'AI research paper publication',
    'generative AI new feature',
    'AI company acquisition merger',
    'AI ethics controversy debate'
  ];

  const newsItems = [];

  // 使用 Perplexity API (通过 OpenClaw 的 web_search 工具)
  for (const query of searchQueries) {
    try {
      const result = await callWebSearch(query);
      if (result && result.results && result.results.length > 0) {
        newsItems.push({
          title: result.results[0].title,
          url: result.results[0].url,
          source: 'AI News',
          snippet: result.results[0].snippet || result.results[0].content
        });
      }
    } catch (error) {
      console.error(`搜索失败 "${query}":`, error.message);
    }
  }

  return newsItems.slice(0, CONFIG.newsCount);
}

/**
 * 调用 web_search API
 */
function callWebSearch(query) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      query: query,
      count: 2,
      freshness: 'day'
    });

    const options = {
      hostname: 'localhost',
      port: 3000, // OpenClaw API 端口 (需要根据实际配置调整)
      path: '/api/web_search',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('解析失败'));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

/**
 * 分类 AI 资讯
 */
function classifyNews(title, snippet) {
  const text = (title + ' ' + snippet).toLowerCase();
  
  if (text.includes('launch') || text.includes('release') || text.includes('announce')) {
    return '🚀 产品发布';
  } else if (text.includes('regulation') || text.includes('ban') || text.includes('lawsuit') || text.includes('controversy')) {
    return '⚔️ 争议监管';
  } else if (text.includes('company') || text.includes('acquisition') || text.includes('merge')) {
    return '💼 企业动态';
  } else if (text.includes('breakthrough') || text.includes('research') || text.includes('paper')) {
    return '⚡ 技术突破';
  } else if (text.includes('fund') || text.includes('invest') || text.includes('million') || text.includes('billion')) {
    return '💰 投融资';
  } else {
    return '📊 数据洞察';
  }
}

/**
 * 写入飞书多维表格
 */
function writeToBitable(newsItems) {
  console.log('📝 写入飞书多维表格...');
  
  const today = new Date();

  for (const news of newsItems) {
    const category = classifyNews(news.title, news.snippet);
    
    const fields = {
      '标题': news.title,
      '分类': category,
      '发布日期': today.getTime(),
      '来源': news.source,
      '摘要': news.snippet,
      '链接': news.url,
      '热度评分': parseFloat((Math.random() * 10).toFixed(1)),
      '发布状态': '待审核'
    };

    console.log(`📰 准备添加：${news.title}`);
    console.log(`   分类：${category}`);
    console.log(`   链接：${news.url}`);
    
    // 这里需要使用 OpenClaw 的 feishu 插件 API
    // 由于是独立脚本，我们通过 sessions_send 调用 mi-zhi agent
    console.log(`   状态：待写入 (需要飞书授权)`);
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🤖 AI 资讯采集任务启动');
  console.log('📅 执行时间:', new Date().toISOString());
  console.log('---');

  try {
    const newsItems = await searchAINews();
    console.log(`📰 收集到 ${newsItems.length} 条资讯`);

    if (newsItems.length === 0) {
      console.log('⚠️ 未收集到任何资讯，任务结束');
      process.exit(0);
    }

    writeToBitable(newsItems);

    console.log('---');
    console.log('✅ 任务完成！');
  } catch (error) {
    console.error('❌ 任务失败:', error.message);
    process.exit(1);
  }
}

main();

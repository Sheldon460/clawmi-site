#!/usr/bin/env node
/**
 * 智能收藏回顾系统 - 添加新收藏
 * Usage: node shoucang-add.js <URL> [分类]
 */

const CONFIG = require('./config');
const {
  generateId,
  loadCollections,
  saveCollections,
  calculateNextReview,
  fetchUrlContent,
  log,
  exportToMarkdown
} = require('./utils');

/**
 * 添加新收藏
 */
async function addCollection(url, category = '未分类') {
  console.log(`🔄 正在抓取: ${url}`);

  // 1. 抓取网页内容
  const fetched = await fetchUrlContent(url);

  // 2. 生成收藏数据
  const now = new Date().toISOString();
  const id = generateId();

  const collection = {
    id,
    url,
    title: fetched.title,
    tags: fetched.tags,
    category,
    summary: fetched.summary,
    content: fetched.content,
    status: CONFIG.STATUS.INBOX,
    createdAt: now,
    nextReview: calculateNextReview(0, new Date()),
    reviewCount: 0,
    reviewHistory: []
  };

  // 3. 保存到JSON数据库
  const collections = loadCollections();
  collections.push(collection);
  saveCollections(collections);

  // 4. 导出为Markdown
  const mdPath = exportToMarkdown(collection);

  // 5. 记录日志
  log(`添加收藏: ${id} - ${fetched.title}`);

  // 6. 输出结果
  console.log('\n✅ 收藏添加成功!');
  console.log('─'.repeat(50));
  console.log(`📌 ID: ${id}`);
  console.log(`📄 标题: ${fetched.title}`);
  console.log(`🏷️ 标签: ${fetched.tags.join(', ')}`);
  console.log(`📂 分类: ${category}`);
  console.log(`📅 下次回顾: ${new Date(collection.nextReview).toLocaleString('zh-CN')}`);
  console.log(`💾 Markdown: ${mdPath}`);
  console.log('─'.repeat(50));

  return collection;
}

/**
 * 批量添加收藏
 */
async function addBatch(urls, category = '未分类') {
  const results = [];
  for (const url of urls) {
    try {
      const result = await addCollection(url.trim(), category);
      results.push(result);
    } catch (e) {
      console.error(`❌ 添加失败: ${url}`, e.message);
    }
  }
  return results;
}

/**
 * 从Markdown文件导入
 */
async function importFromMarkdown(filePath) {
  const fs = require('fs');
  const content = fs.readFileSync(filePath, 'utf-8');

  // 提取URL（支持多种格式）
  const urlRegex = /https?:\/\/[^\s\)\]\>]+/g;
  const urls = content.match(urlRegex) || [];

  console.log(`📄 从文件导入，发现 ${urls.length} 个链接`);

  return addBatch(urls);
}

// CLI 入口
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
智能收藏回顾系统 - 添加收藏

用法:
  node shoucang-add.js <URL> [分类]
  node shoucang-add.js --batch <URL1> <URL2> ... [分类]
  node shoucang-add.js --import <markdown文件路径>

示例:
  node shoucang-add.js "https://example.com/article" "技术"
  node shoucang-add.js --batch "url1" "url2" "url3" "产品"
  node shoucang-add.js --import "/path/to/bookmarks.md"
`);
    process.exit(0);
  }

  const command = args[0];

  if (command === '--batch') {
    // 批量模式
    const urls = args.slice(1, -1);
    const category = args[args.length - 1] || '未分类';
    addBatch(urls, category);
  } else if (command === '--import') {
    // 导入模式
    const filePath = args[1];
    if (!filePath) {
      console.error('❌ 请提供Markdown文件路径');
      process.exit(1);
    }
    importFromMarkdown(filePath);
  } else {
    // 单条添加模式
    const url = args[0];
    const category = args[1] || '未分类';
    addCollection(url, category);
  }
}

module.exports = { addCollection, addBatch, importFromMarkdown };

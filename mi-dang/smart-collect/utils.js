/**
 * 智能收藏回顾系统 - 工具函数库
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const CONFIG = require('./config');

/**
 * 确保目录存在
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * 生成唯一ID
 * 格式: YYYYMMDD-XXX (如 20260308-001)
 */
function generateId() {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');

  // 读取现有collections获取当天序号
  const collections = loadCollections();
  const todayIds = collections.filter(c => c.id.startsWith(dateStr));
  const seq = String(todayIds.length + 1).padStart(3, '0');

  return `${dateStr}-${seq}`;
}

/**
 * 获取collections文件路径
 */
function getCollectionsPath() {
  ensureDir(CONFIG.DATA_DIR);
  return path.join(CONFIG.DATA_DIR, CONFIG.COLLECTIONS_FILE);
}

/**
 * 加载所有收藏
 */
function loadCollections() {
  const filePath = getCollectionsPath();
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    console.error('加载收藏数据失败:', e.message);
    return [];
  }
}

/**
 * 保存所有收藏
 */
function saveCollections(collections) {
  const filePath = getCollectionsPath();
  ensureDir(CONFIG.DATA_DIR);
  fs.writeFileSync(filePath, JSON.stringify(collections, null, 2), 'utf-8');
}

/**
 * 根据ID查找收藏
 */
function findCollectionById(id) {
  const collections = loadCollections();
  return collections.find(c => c.id === id);
}

/**
 * 根据ID查找收藏的索引
 */
function findCollectionIndex(id) {
  const collections = loadCollections();
  return collections.findIndex(c => c.id === id);
}

/**
 * 更新收藏
 */
function updateCollection(id, updates) {
  const collections = loadCollections();
  const index = collections.findIndex(c => c.id === id);
  if (index === -1) {
    return null;
  }
  collections[index] = { ...collections[index], ...updates };
  saveCollections(collections);
  return collections[index];
}

/**
 * 计算下次回顾时间
 * @param {number} reviewCount - 已回顾次数
 * @param {Date} baseDate - 基准日期（默认今天）
 */
function calculateNextReview(reviewCount, baseDate = new Date()) {
  const intervals = CONFIG.REVIEW_INTERVALS;

  if (reviewCount >= intervals.length) {
    // 已完成所有回顾周期，返回null表示归档
    return null;
  }

  const daysToAdd = intervals[reviewCount];
  const nextReview = new Date(baseDate);
  nextReview.setDate(nextReview.getDate() + daysToAdd);
  nextReview.setHours(CONFIG.TIME.DAILY_REVIEW_HOUR, CONFIG.TIME.DAILY_REVIEW_MINUTE, 0, 0);

  return nextReview.toISOString();
}

/**
 * 格式化日期显示
 */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * 格式化相对时间
 */
function formatRelativeTime(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = date - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '明天';
  if (diffDays < 0) return `已逾期 ${Math.abs(diffDays)} 天`;
  return `${diffDays} 天后`;
}

/**
 * 抓取网页内容并生成摘要
 * 调用 canghe-url-to-markdown 技能
 * 
 * 注意: 需要先设置 URL_CHROME_PATH 环境变量
 * export URL_CHROME_PATH="/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
 */
async function fetchUrlContent(url) {
  const tempDir = path.join(CONFIG.DATA_DIR, 'temp');
  ensureDir(tempDir);

  const outputFile = path.join(tempDir, `fetch-${Date.now()}.md`);

  try {
    // 设置环境变量并执行抓取
    // 使用 bun 运行 TypeScript 脚本
    const cmd = `export URL_CHROME_PATH="${CONFIG.CHROME_PATH}" && npx -y bun "${CONFIG.URL_TO_MD_SCRIPT}" "${url}" -o "${outputFile}"`;

    console.log(`🌐 正在抓取: ${url}`);
    console.log(`   使用 Chrome: ${CONFIG.CHROME_PATH}`);

    execSync(cmd, {
      timeout: 90000, // 90秒超时，给Chrome足够时间渲染
      stdio: 'pipe',
      env: {
        ...process.env,
        URL_CHROME_PATH: CONFIG.CHROME_PATH
      }
    });

    if (!fs.existsSync(outputFile)) {
      throw new Error('抓取失败：未生成输出文件');
    }

    const content = fs.readFileSync(outputFile, 'utf-8');
    console.log(`   ✅ 抓取成功，内容长度: ${content.length} 字符`);

    // 清理临时文件
    try {
      fs.unlinkSync(outputFile);
    } catch (e) {
      // 忽略清理错误
    }

    return parseMarkdownContent(content, url);
  } catch (e) {
    console.error('❌ 抓取网页失败:', e.message);
    // 返回基础信息
    return {
      title: '未获取标题',
      summary: ['无法自动抓取内容，请手动添加摘要'],
      tags: ['未分类'],
      content: ''
    };
  }
}

/**
 * 解析Markdown内容
 */
function parseMarkdownContent(content, url) {
  // 提取标题（从frontmatter或第一个#标题）
  let title = '未获取标题';
  const titleMatch = content.match(/^title:\s*(.+)$/m) || content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }

  // 提取正文内容（去掉frontmatter）
  let bodyContent = content;
  const frontmatterMatch = content.match(/^---\n[\s\S]*?\n---\n/);
  if (frontmatterMatch) {
    bodyContent = content.slice(frontmatterMatch[0].length);
  }

  // 生成简单摘要（取前3段非空文本）
  const paragraphs = bodyContent
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p && !p.startsWith('#') && p.length > 20)
    .slice(0, 3);

  const summary = paragraphs.length > 0
    ? paragraphs.map(p => p.replace(/[#*_`]/g, '').slice(0, 100) + '...')
    : ['内容摘要待补充'];

  // 智能标签提取（简单版本）
  const tags = extractTags(bodyContent);

  return {
    title,
    summary,
    tags,
    content: bodyContent.slice(0, 5000) // 保存前5000字符
  };
}

/**
 * 从内容中提取标签
 */
function extractTags(content) {
  const tagKeywords = {
    'AI': ['人工智能', 'AI', '机器学习', '深度学习', 'LLM', '大模型', 'ChatGPT', 'Claude'],
    '技术': ['编程', '代码', '开发', '架构', '算法', '前端', '后端', '数据库'],
    '产品': ['产品经理', '产品设计', '用户体验', 'UX', '需求', '功能'],
    '设计': ['UI', '视觉', '设计', 'Figma', '配色', '排版'],
    '运营': ['运营', '增长', '转化', '用户', '社群', '内容'],
    '创业': ['创业', '创始人', '融资', '商业模式', ' startup'],
    '投资': ['投资', '股票', '基金', '理财', '市场', '经济'],
    '方法论': ['方法论', '思维', '框架', '模型', '原则', '系统']
  };

  const foundTags = [];
  const lowerContent = content.toLowerCase();

  for (const [tag, keywords] of Object.entries(tagKeywords)) {
    if (keywords.some(kw => lowerContent.includes(kw.toLowerCase()))) {
      foundTags.push(tag);
      if (foundTags.length >= 3) break;
    }
  }

  return foundTags.length > 0 ? foundTags : ['未分类'];
}

/**
 * 写入日志
 */
function log(message) {
  const logPath = path.join(CONFIG.DATA_DIR, CONFIG.LOG_FILE);
  ensureDir(CONFIG.DATA_DIR);

  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;

  fs.appendFileSync(logPath, logEntry, 'utf-8');
}

/**
 * 创建Markdown格式的收藏文档
 */
function createMarkdownDoc(collection) {
  const { id, url, title, tags, category, summary, content, status, createdAt, nextReview, reviewCount } = collection;

  return `---
id: "${id}"
url: "${url}"
title: "${title}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
category: "${category || '未分类'}"
status: "${status}"
created_at: "${createdAt}"
next_review: "${nextReview || '已完成所有回顾'}"
review_count: ${reviewCount}
---

# ${title}

## 📋 元信息
- **ID**: ${id}
- **链接**: [${url}](${url})
- **标签**: ${tags.join(', ')}
- **分类**: ${category || '未分类'}
- **状态**: ${getStatusLabel(status)}
- **创建时间**: ${formatDate(createdAt)}
- **下次回顾**: ${nextReview ? formatDate(nextReview) + ' (' + formatRelativeTime(nextReview) + ')' : '已完成所有回顾'}
- **回顾次数**: ${reviewCount}

## 📝 AI摘要
${summary.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## 📖 原文内容
${content || '> 原文内容未保存'}

---
*由智能收藏回顾系统自动生成*
`;
}

/**
 * 获取状态标签
 */
function getStatusLabel(status) {
  const labels = {
    [CONFIG.STATUS.INBOX]: '📥 收件箱',
    [CONFIG.STATUS.REVIEWING]: '🔄 回顾中',
    [CONFIG.STATUS.ARCHIVED]: '✅ 已归档',
    [CONFIG.STATUS.SNOOZED]: '⏸️ 已推迟'
  };
  return labels[status] || status;
}

/**
 * 导出收藏为Markdown文件
 */
function exportToMarkdown(collection) {
  const mdContent = createMarkdownDoc(collection);
  const fileName = `${collection.id}-${sanitizeFileName(collection.title)}.md`;
  const filePath = path.join(CONFIG.DATA_DIR, 'exports', fileName);

  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, mdContent, 'utf-8');

  return filePath;
}

/**
 * 清理文件名中的非法字符
 */
function sanitizeFileName(name) {
  return name
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/\s+/g, '-')
    .slice(0, 50);
}

module.exports = {
  ensureDir,
  generateId,
  loadCollections,
  saveCollections,
  findCollectionById,
  findCollectionIndex,
  updateCollection,
  calculateNextReview,
  formatDate,
  formatRelativeTime,
  fetchUrlContent,
  log,
  createMarkdownDoc,
  exportToMarkdown,
  getStatusLabel
};

#!/usr/bin/env node
/**
 * 智能收藏回顾系统 - 自然语言处理入口
 * 支持: "添加链接 xxx"、"推迟3天"、"已看完归档"、"今天回顾什么" 等指令
 *
 * Usage: node smart-collect.js "自然语言指令"
 */

const { addCollection } = require('./shoucang-add');
const {
  getTodayReviews,
  generateReviewReport,
  markAsReviewed,
  snoozeReview,
  archiveCollection,
  showStats
} = require('./shoucang-review');
const { loadCollections, findCollectionById, formatDate } = require('./utils');

/**
 * 自然语言指令解析器
 */
class NaturalLanguageParser {
  constructor() {
    // 指令模式定义
    this.patterns = {
      // 添加收藏
      add: [
        /(?:添加|保存|收藏|加入)\s*(?:链接|文章|网址|URL)?\s*[:：]?\s*(https?:\/\/\S+)/i,
        /(https?:\/\/\S+)\s*(?:添加|保存|收藏|加入)/i,
        /(?:添加|保存|收藏)\s*(?:到|进)?\s*(\S+?)\s*[:：]?\s*(https?:\/\/\S+)/i
      ],

      // 回顾相关
      review: [
        /(?:今天|今日)?\s*(?:回顾|复习|查看)\s*(?:什么|哪些)?/i,
        /(?:有|查看)?\s*(?:什么|哪些)?\s*(?:待|需要)?\s*(?:回顾|复习)/i,
        /(?:标记|标记为|设为)?\s*(?:已)?\s*(?:回顾|复习|看完|完成)\s*(?:了)?\s*(\S*)/i
      ],

      // 推迟
      snooze: [
        /(?:推迟|延后|延期|延迟)\s*(\d+)\s*(?:天|日)/i,
        /(?:推迟|延后)\s*(?:到|至)?\s*(.+)/i,
        /(?:snooze|delay)\s+(\S+)\s+(\d+)/i
      ],

      // 归档
      archive: [
        /(?:归档|存档|完成|结束)\s*(\S*)/i,
        /(?:已)?\s*(?:看完|读完|完成|结束)\s*(?:了)?\s*(\S*)/i
      ],

      // 查询
      query: [
        /(?:查询|查找|搜索|找)\s*(.+)/i,
        /(?:显示|列出|查看)?\s*(?:所有|全部)?\s*(?:收藏|文章|链接)/i,
        /(?:统计|状态|概况)/i
      ],

      // 帮助
      help: [
        /^(?:帮助|help|怎么用|使用说明)$/i,
        /(?:能做什么|有什么功能)/i
      ]
    };
  }

  /**
   * 解析用户输入
   */
  parse(input) {
    const trimmed = input.trim();

    // 尝试匹配各种模式
    for (const [action, patterns] of Object.entries(this.patterns)) {
      for (const pattern of patterns) {
        const match = trimmed.match(pattern);
        if (match) {
          return {
            action,
            matches: match,
            original: trimmed
          };
        }
      }
    }

    // 默认：尝试提取URL
    const urlMatch = trimmed.match(/(https?:\/\/\S+)/);
    if (urlMatch) {
      return {
        action: 'add',
        matches: [null, urlMatch[1]],
        original: trimmed
      };
    }

    return {
      action: 'unknown',
      matches: [],
      original: trimmed
    };
  }
}

/**
 * 指令执行器
 */
class CommandExecutor {
  constructor() {
    this.parser = new NaturalLanguageParser();
  }

  /**
   * 执行自然语言指令
   */
  async execute(input) {
    const parsed = this.parser.parse(input);

    console.log(`🤖 解析指令: ${parsed.action}`);

    switch (parsed.action) {
      case 'add':
        return this.handleAdd(parsed);
      case 'review':
        return this.handleReview(parsed);
      case 'snooze':
        return this.handleSnooze(parsed);
      case 'archive':
        return this.handleArchive(parsed);
      case 'query':
        return this.handleQuery(parsed);
      case 'help':
        return this.handleHelp();
      default:
        return {
          success: false,
          message: `❓ 无法理解指令: "${input}"\n\n输入 "帮助" 查看可用指令。`
        };
    }
  }

  /**
   * 处理添加指令
   */
  async handleAdd(parsed) {
    const matches = parsed.matches;
    let url, category;

    // 尝试提取分类和URL
    if (matches[2] && matches[2].startsWith('http')) {
      // 模式: 添加 分类 URL
      category = matches[1];
      url = matches[2];
    } else if (matches[1] && matches[1].startsWith('http')) {
      // 模式: 添加 URL
      url = matches[1];
      category = '未分类';
    } else {
      return { success: false, message: '❌ 无法提取有效的URL' };
    }

    try {
      const result = await addCollection(url, category);
      return {
        success: true,
        message: `✅ 已添加收藏: ${result.title}`,
        data: result
      };
    } catch (e) {
      return { success: false, message: `❌ 添加失败: ${e.message}` };
    }
  }

  /**
   * 处理回顾指令
   */
  handleReview(parsed) {
    const input = parsed.original;

    // 检查是否有ID参数
    const idMatch = input.match(/(\d{8}-\d{3})/);

    if (idMatch) {
      // 标记特定ID为已回顾
      const id = idMatch[1];
      const result = markAsReviewed(id);
      return {
        success: result.success,
        message: result.message
      };
    } else {
      // 列出今日待回顾
      const items = getTodayReviews();
      const report = generateReviewReport(items);
      return {
        success: true,
        message: report.text,
        data: { items, count: items.length }
      };
    }
  }

  /**
   * 处理推迟指令
   */
  handleSnooze(parsed) {
    const matches = parsed.matches;
    const input = parsed.original;

    // 提取天数
    let days = 1;
    if (matches[1] && !isNaN(parseInt(matches[1]))) {
      days = parseInt(matches[1]);
    }

    // 提取ID（从输入中查找）
    const idMatch = input.match(/(\d{8}-\d{3})/);
    if (!idMatch) {
      return {
        success: false,
        message: '❌ 请指定要推迟的收藏ID（如: 推迟3天 20260308-001）'
      };
    }

    const id = idMatch[1];
    const result = snoozeReview(id, days);

    return {
      success: result.success,
      message: result.message
    };
  }

  /**
   * 处理归档指令
   */
  handleArchive(parsed) {
    const input = parsed.original;

    // 提取ID
    const idMatch = input.match(/(\d{8}-\d{3})/);

    if (idMatch) {
      const id = idMatch[1];
      const result = archiveCollection(id);
      return {
        success: result.success,
        message: result.message
      };
    } else {
      // 尝试归档最近操作的收藏（简化：归档第一个非归档项）
      const collections = loadCollections();
      const lastActive = collections.find(c => c.status !== 'archived');

      if (lastActive) {
        const result = archiveCollection(lastActive.id);
        return {
          success: result.success,
          message: result.message
        };
      }

      return {
        success: false,
        message: '❌ 未找到可归档的收藏'
      };
    }
  }

  /**
   * 处理查询指令
   */
  handleQuery(parsed) {
    const input = parsed.original;

    // 检查是否是统计请求
    if (/统计|状态|概况/.test(input)) {
      showStats();
      return { success: true, message: '统计信息已显示' };
    }

    // 搜索特定内容
    const searchMatch = input.match(/(?:查询|查找|搜索|找)\s*(.+)/);
    if (searchMatch) {
      const keyword = searchMatch[1].trim();
      const collections = loadCollections();

      const results = collections.filter(c =>
        c.title.includes(keyword) ||
        c.tags.some(t => t.includes(keyword)) ||
        c.category.includes(keyword) ||
        c.id === keyword
      );

      if (results.length === 0) {
        return { success: true, message: `🔍 未找到包含 "${keyword}" 的收藏` };
      }

      let output = `🔍 找到 ${results.length} 个结果:\n\n`;
      results.forEach(c => {
        output += `[${c.id}] ${c.title}\n`;
        output += `   状态: ${c.status} | 标签: ${c.tags.join(', ')}\n\n`;
      });

      return { success: true, message: output, data: results };
    }

    // 列出所有
    const collections = loadCollections();
    let output = `📚 所有收藏 (${collections.length} 项):\n\n`;

    collections.slice(-10).forEach(c => {
      const statusIcon = {
        'inbox': '📥',
        'reviewing': '🔄',
        'archived': '✅',
        'snoozed': '⏸️'
      }[c.status] || '📄';

      output += `${statusIcon} [${c.id}] ${c.title}\n`;
      output += `   下次回顾: ${c.nextReview ? formatDate(c.nextReview) : '已完成'}\n\n`;
    });

    return { success: true, message: output };
  }

  /**
   * 处理帮助指令
   */
  handleHelp() {
    const helpText = `
📖 智能收藏回顾系统 - 使用指南
═══════════════════════════════════════

📝 添加收藏:
  "添加链接 https://example.com"
  "保存 https://example.com 到技术"
  "收藏 https://example.com"
  (直接发送URL也可以)

👀 查看回顾:
  "今天回顾什么"
  "有哪些待回顾"
  "查看待回顾"

✅ 标记完成:
  "已回顾 20260308-001"
  "标记 20260308-001 为已看完"
  "完成 20260308-001"

⏸️ 推迟提醒:
  "推迟3天 20260308-001"
  "延后 20260308-001 到下周"

📦 归档:
  "归档 20260308-001"
  "已看完归档"

🔍 查询:
  "查询 AI"
  "查找产品设计"
  "统计"
  "列出所有收藏"

═══════════════════════════════════════
💡 提示: 收藏ID格式为 YYYYMMDD-XXX (如 20260308-001)
`;

    return { success: true, message: helpText };
  }
}

/**
 * 主入口
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
智能收藏回顾系统 - 自然语言入口

用法:
  node smart-collect.js "自然语言指令"

示例:
  node smart-collect.js "添加链接 https://example.com"
  node smart-collect.js "今天回顾什么"
  node smart-collect.js "推迟3天 20260308-001"
  node smart-collect.js "已看完归档"

输入 "帮助" 查看完整指令列表。
`);
    process.exit(0);
  }

  const input = args.join(' ');
  const executor = new CommandExecutor();
  const result = await executor.execute(input);

  console.log('\n' + result.message);

  // 返回退出码
  process.exit(result.success ? 0 : 1);
}

// 如果直接运行
if (require.main === module) {
  main();
}

module.exports = { CommandExecutor, NaturalLanguageParser };

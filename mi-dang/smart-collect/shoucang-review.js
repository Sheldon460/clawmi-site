#!/usr/bin/env node
/**
 * 智能收藏回顾系统 - 每日回顾推送
 * Usage: node shoucang-review.js [--push] [--list]
 */

const CONFIG = require('./config');
const {
  loadCollections,
  updateCollection,
  calculateNextReview,
  formatDate,
  formatRelativeTime,
  log,
  getStatusLabel
} = require('./utils');

/**
 * 获取今日需要回顾的收藏
 */
function getTodayReviews() {
  const collections = loadCollections();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return collections.filter(c => {
    if (c.status === CONFIG.STATUS.ARCHIVED) return false;
    if (!c.nextReview) return false;

    const reviewDate = new Date(c.nextReview);
    const reviewDay = new Date(reviewDate.getFullYear(), reviewDate.getMonth(), reviewDate.getDate());

    return reviewDay <= today;
  }).sort((a, b) => new Date(a.nextReview) - new Date(b.nextReview));
}

/**
 * 获取所有待回顾的收藏
 */
function getAllPendingReviews() {
  const collections = loadCollections();

  return collections.filter(c => {
    return c.status !== CONFIG.STATUS.ARCHIVED && c.nextReview !== null;
  }).sort((a, b) => new Date(a.nextReview) - new Date(b.nextReview));
}

/**
 * 生成回顾报告
 */
function generateReviewReport(items) {
  if (items.length === 0) {
    return {
      text: '🎉 今天没有需要回顾的收藏！',
      count: 0,
      items: []
    };
  }

  const now = new Date();
  const overdue = items.filter(i => new Date(i.nextReview) < now);
  const today = items.filter(i => {
    const d = new Date(i.nextReview);
    return d.toDateString() === now.toDateString();
  });

  let report = `📚 今日回顾 (${items.length} 项)\n`;
  report += '═'.repeat(50) + '\n\n';

  if (overdue.length > 0) {
    report += `⚠️ 逾期 (${overdue.length} 项):\n`;
    overdue.forEach(item => {
      report += formatReviewItem(item, true);
    });
    report += '\n';
  }

  if (today.length > 0) {
    report += `📅 今日到期 (${today.length} 项):\n`;
    today.forEach(item => {
      report += formatReviewItem(item, false);
    });
  }

  return {
    text: report,
    count: items.length,
    overdue: overdue.length,
    today: today.length,
    items
  };
}

/**
 * 格式化单个回顾项
 */
function formatReviewItem(item, isOverdue) {
  const icon = isOverdue ? '🔴' : '🟡';
  const relative = formatRelativeTime(item.nextReview);

  return `${icon} [${item.id}] ${item.title}\n` +
         `   🏷️ ${item.tags.join(', ')} | 📂 ${item.category}\n` +
         `   🔗 ${item.url}\n` +
         `   ⏰ ${relative} | 已回顾 ${item.reviewCount} 次\n` +
         `   💡 ${item.summary[0] || '无摘要'}\n\n`;
}

/**
 * 标记收藏为已回顾
 */
function markAsReviewed(id, notes = '') {
  const collection = loadCollections().find(c => c.id === id);
  if (!collection) {
    return { success: false, error: '未找到该收藏' };
  }

  const now = new Date().toISOString();
  const newReviewCount = collection.reviewCount + 1;
  const nextReview = calculateNextReview(newReviewCount, new Date());

  const updates = {
    reviewCount: newReviewCount,
    nextReview,
    status: nextReview ? CONFIG.STATUS.REVIEWING : CONFIG.STATUS.ARCHIVED,
    lastReviewedAt: now,
    reviewHistory: [
      ...(collection.reviewHistory || []),
      { date: now, notes }
    ]
  };

  updateCollection(id, updates);
  log(`标记已回顾: ${id} (第${newReviewCount}次)`);

  const statusText = nextReview
    ? `下次回顾: ${formatDate(nextReview)}`
    : '已完成所有回顾周期，已归档';

  return {
    success: true,
    message: `✅ 已标记 "${collection.title}" 为已回顾\n${statusText}`,
    collection: { ...collection, ...updates }
  };
}

/**
 * 推迟回顾
 */
function snoozeReview(id, days) {
  const collection = loadCollections().find(c => c.id === id);
  if (!collection) {
    return { success: false, error: '未找到该收藏' };
  }

  const now = new Date();
  const snoozeUntil = new Date(now);
  snoozeUntil.setDate(snoozeUntil.getDate() + days);
  snoozeUntil.setHours(CONFIG.TIME.DAILY_REVIEW_HOUR, CONFIG.TIME.DAILY_REVIEW_MINUTE, 0, 0);

  const updates = {
    nextReview: snoozeUntil.toISOString(),
    status: CONFIG.STATUS.SNOOZED,
    snoozedAt: now.toISOString(),
    snoozeDays: days
  };

  updateCollection(id, updates);
  log(`推迟回顾: ${id} (${days}天后)`);

  return {
    success: true,
    message: `⏸️ 已推迟 "${collection.title}"\n下次提醒: ${formatDate(snoozeUntil.toISOString())}`,
    collection: { ...collection, ...updates }
  };
}

/**
 * 归档收藏
 */
function archiveCollection(id) {
  const collection = loadCollections().find(c => c.id === id);
  if (!collection) {
    return { success: false, error: '未找到该收藏' };
  }

  const updates = {
    status: CONFIG.STATUS.ARCHIVED,
    nextReview: null,
    archivedAt: new Date().toISOString()
  };

  updateCollection(id, updates);
  log(`归档收藏: ${id}`);

  return {
    success: true,
    message: `✅ 已归档 "${collection.title}"`,
    collection: { ...collection, ...updates }
  };
}

/**
 * 生成飞书卡片消息
 */
function generateFeishuCard(report) {
  if (report.count === 0) {
    return {
      config: { wide_screen_mode: true },
      header: {
        title: { tag: 'plain_text', content: '🎉 今日无待回顾收藏' },
        template: 'green'
      },
      elements: [
        {
          tag: 'div',
          text: { tag: 'lark_md', content: '今天没有需要回顾的收藏，休息一下！' }
        }
      ]
    };
  }

  const elements = [
    {
      tag: 'div',
      text: {
        tag: 'lark_md',
        content: `**📊 统计**: 共 ${report.count} 项待回顾${report.overdue > 0 ? ` (⚠️ 逾期 ${report.overdue} 项)` : ''}`
      }
    },
    { tag: 'hr' }
  ];

  // 添加每个收藏项
  report.items.forEach(item => {
    const isOverdue = new Date(item.nextReview) < new Date();
    const icon = isOverdue ? '🔴' : '🟡';

    elements.push({
      tag: 'div',
      text: {
        tag: 'lark_md',
        content: `${icon} **[${item.id}]** ${item.title}\n🏷️ ${item.tags.join(', ')} | 📂 ${item.category}\n⏰ ${formatRelativeTime(item.nextReview)}`
      }
    });

    elements.push({
      tag: 'action',
      actions: [
        {
          tag: 'button',
          text: { tag: 'plain_text', content: '✅ 已回顾' },
          type: 'primary',
          value: { action: 'review', id: item.id }
        },
        {
          tag: 'button',
          text: { tag: 'plain_text', content: '⏸️ 推迟1天' },
          type: 'default',
          value: { action: 'snooze', id: item.id, days: 1 }
        },
        {
          tag: 'button',
          text: { tag: 'plain_text', content: '📦 归档' },
          type: 'danger',
          value: { action: 'archive', id: item.id }
        }
      ]
    });

    elements.push({ tag: 'hr' });
  });

  return {
    config: { wide_screen_mode: true },
    header: {
      title: { tag: 'plain_text', content: `📚 今日回顾 (${report.count} 项)` },
      template: report.overdue > 0 ? 'red' : 'blue'
    },
    elements
  };
}

/**
 * 推送到飞书
 */
async function pushToFeishu(report) {
  // 这里会通过 OpenClaw 的 message 工具发送
  // 实际调用由外部处理
  return {
    success: true,
    card: generateFeishuCard(report),
    textReport: report.text
  };
}

/**
 * 显示统计信息
 */
function showStats() {
  const collections = loadCollections();

  const stats = {
    total: collections.length,
    inbox: collections.filter(c => c.status === CONFIG.STATUS.INBOX).length,
    reviewing: collections.filter(c => c.status === CONFIG.STATUS.REVIEWING).length,
    archived: collections.filter(c => c.status === CONFIG.STATUS.ARCHIVED).length,
    snoozed: collections.filter(c => c.status === CONFIG.STATUS.SNOOZED).length
  };

  const todayReviews = getTodayReviews();

  console.log(`
📊 收藏统计
═══════════════════════════════════
总收藏数: ${stats.total}
📥 收件箱: ${stats.inbox}
🔄 回顾中: ${stats.reviewing}
✅ 已归档: ${stats.archived}
⏸️ 已推迟: ${stats.snoozed}
─────────────────────────────────
📅 今日待回顾: ${todayReviews.length}
`);

  return stats;
}

// CLI 入口
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0] || '--list';

  switch (command) {
    case '--list':
    case '-l': {
      const items = getTodayReviews();
      const report = generateReviewReport(items);
      console.log(report.text);
      break;
    }

    case '--all':
    case '-a': {
      const items = getAllPendingReviews();
      console.log(`📚 所有待回顾收藏 (${items.length} 项):\n`);
      items.forEach(item => {
        console.log(formatReviewItem(item, new Date(item.nextReview) < new Date()));
      });
      break;
    }

    case '--stats':
    case '-s': {
      showStats();
      break;
    }

    case '--review':
    case '-r': {
      const id = args[1];
      if (!id) {
        console.error('❌ 请提供收藏ID');
        process.exit(1);
      }
      const result = markAsReviewed(id, args[2] || '');
      console.log(result.success ? result.message : `❌ ${result.error}`);
      break;
    }

    case '--snooze':
    case '-z': {
      const id = args[1];
      const days = parseInt(args[2]) || 1;
      if (!id) {
        console.error('❌ 请提供收藏ID');
        process.exit(1);
      }
      const result = snoozeReview(id, days);
      console.log(result.success ? result.message : `❌ ${result.error}`);
      break;
    }

    case '--archive':
    case '-x': {
      const id = args[1];
      if (!id) {
        console.error('❌ 请提供收藏ID');
        process.exit(1);
      }
      const result = archiveCollection(id);
      console.log(result.success ? result.message : `❌ ${result.error}`);
      break;
    }

    case '--push':
    case '-p': {
      const items = getTodayReviews();
      const report = generateReviewReport(items);
      pushToFeishu(report).then(result => {
        console.log('📤 推送结果:', result.success ? '成功' : '失败');
        console.log(report.text);
      });
      break;
    }

    default: {
      console.log(`
智能收藏回顾系统 - 每日回顾

用法:
  node shoucang-review.js [选项]

选项:
  --list, -l      列出今日待回顾 (默认)
  --all, -a       列出所有待回顾
  --stats, -s     显示统计信息
  --review, -r    标记已回顾: --review <ID> [笔记]
  --snooze, -z    推迟回顾: --snooze <ID> [天数]
  --archive, -x   归档收藏: --archive <ID>
  --push, -p      推送到飞书

示例:
  node shoucang-review.js
  node shoucang-review.js --review 20260308-001
  node shoucang-review.js --snooze 20260308-001 3
`);
    }
  }
}

module.exports = {
  getTodayReviews,
  getAllPendingReviews,
  generateReviewReport,
  markAsReviewed,
  snoozeReview,
  archiveCollection,
  pushToFeishu,
  showStats,
  generateFeishuCard
};

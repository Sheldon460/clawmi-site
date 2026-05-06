/**
 * 智能收藏回顾系统 - 配置文件
 */

const path = require('path');

const CONFIG = {
  // 数据存储路径
  DATA_DIR: '/Volumes/My house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output/mi-dang/smart-collect',

  // 收藏数据文件
  COLLECTIONS_FILE: 'collections.json',

  // 日志文件
  LOG_FILE: 'activity.log',

  // 艾宾浩斯遗忘曲线间隔（天）
  REVIEW_INTERVALS: [1, 2, 4, 7, 15],

  // 状态定义
  STATUS: {
    INBOX: 'inbox',      // 收件箱（新添加）
    REVIEWING: 'reviewing', // 回顾中
    ARCHIVED: 'archived',   // 已归档
    SNOOZED: 'snoozed'      // 已推迟
  },

  // 分类标签预设
  DEFAULT_TAGS: [
    '技术', '产品', '设计', '运营', '管理',
    'AI', '创业', '投资', '生活', '学习',
    '工具', '方法论', '案例', '趋势', '深度'
  ],

  // Chrome 路径（用于抓取网页）
  CHROME_PATH: '/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',

  // URL to Markdown 脚本路径
  URL_TO_MD_SCRIPT: path.join(
    process.env.HOME || '',
    '.openclaw/skills/canghe-url-to-markdown/scripts/main.ts'
  ),

  // 飞书推送配置
  FEISHU: {
    // 是否启用飞书推送
    ENABLED: true,
    // 推送目标用户 open_id
    TARGET_USER: 'ou_778d25389a87b0f55011084c8d637a32'
  },

  // 时间配置
  TIME: {
    // 每日回顾时间（24小时制）
    DAILY_REVIEW_HOUR: 9,
    DAILY_REVIEW_MINUTE: 30,
    // 时区
    TIMEZONE: 'Asia/Shanghai'
  }
};

module.exports = CONFIG;

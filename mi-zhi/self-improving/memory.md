# Memory (HOT Tier) - mi-zhi

## Preferences
- 情报收集首选工具: Playwright CDP (端口 56684)
- 网页抓取首选工具: canghe-url-to-markdown
- 反爬网页首选: curl + 移动端UA → Chrome CDP
- 数据归档路径: /tmp/ 或 memory/YYYY-MM-DD.md
- 热点收集频率: 按需执行
- 搜索工具: DuckDuckGo (ddgs)
- 研究流程: 多维度搜索 → 内容提取 → 交叉验证 → 结构化报告

## Patterns

### 情报收集成功模式
1. **抖音热点**: Chrome CDP + canghe-url-to-markdown
   - 环境变量: URL_CHROME_PATH
   - 命令: bun scripts/main.ts "https://www.douyin.com"
   - 数据量: 632行典型

2. **小红书热点**: Playwright CDP (需登录)
   - CDP端口: http://127.0.0.1:56684
   - 需先登录小红书账号
   - 搜索URL: https://www.xiaohongshu.com/search_result?keyword=关键词

3. **X/Twitter监控**: Playwright CDP (已登录)
   - CDP端口: http://127.0.0.1:56684
   - 已登录状态: Sam Altman等账号可抓取
   - 数据量: 218行典型

4. **GitHub情报**: gh CLI
   - 已认证: Sheldon460
   - 命令: gh search repos / gh issue list

5. **Hacker News**: Chrome CDP
   - 命令同抖音模式
   - 数据量: 245行典型

### 反爬网页访问模式
方法优先级（按顺序自动尝试）：

1. **curl + 移动端UA（最快）**
```bash
UA='Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X)...'
curl -s -L -A "$UA" --connect-timeout 10 --max-time 30 "URL"
```

2. **Chrome Headless dump-dom（JS渲染）**
```bash
"/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-sandbox --dump-dom --virtual-time-budget=10000 "URL"
```

3. **Chrome Remote Debugging（最强）**
```javascript
const browser = await chromium.connectOverCDP('http://127.0.0.1:56684');
const page = await browser.contexts()[0].newPage();
await page.goto('URL', { waitUntil: 'networkidle' });
const html = await page.content();
```

### 微信公众号专用
```bash
# 移动端UA抓取
curl -s -A 'Mozilla/5.0 (iPhone...)' 'URL' > page.html

# 提取 js_content 内容
grep -o 'js_content[^>]*>[^<]*' page.html
```

### 网页搜索模式
```python
from duckduckgo_search import DDGS

# 文本搜索
with DDGS() as ddgs:
    results = ddgs.text("关键词", max_results=10)

# 新闻搜索
with DDGS() as ddgs:
    results = ddgs.news("关键词", max_results=5)

# 视频搜索
with DDGS() as ddgs:
    results = ddgs.videos("关键词", max_results=5)
```

### 浏览器控制模式
```javascript
const { chromium } = require('playwright');

// 连接 Chrome CDP
const browser = await chromium.connectOverCDP('http://127.0.0.1:56684');

// 打开页面
const page = await browser.contexts()[0].newPage();
await page.goto('https://...');

// 截图
await page.screenshot({ path: 'screenshot.png' });

// 获取内容
const text = await page.evaluate(() => document.body.innerText);

// 关闭
await page.close();
```

### 深度研究模式
1. **多维度搜索**: 使用不同关键词组合搜索
2. **信息源收集**: 收集标题、URL、摘要
3. **交叉验证**: 对比多个来源的关键数据
4. **结构化报告**: 生成含引用来源的 Markdown 报告

## Rules
- 任务启动: 必须读取 MEMORY.md 和最近日记
- 任务结束: 必须检查是否需要Self-Improving固化
- 错误处理: 立即记录到 corrections.md
- 热点收集: 优先使用已验证成功的平台
- 搜索限流: DuckDuckGo 频繁请求会触发 403
- 浏览器控制: 优先使用已登录的 Chrome CDP 端口 56684
- 反爬网页: 按顺序尝试 curl → Chrome Headless → Chrome CDP
- 微信公众号: 使用移动端UA，检查 js_content 区域

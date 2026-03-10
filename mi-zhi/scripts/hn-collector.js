const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:56684');
  const context = browser.contexts()[0];
  const page = await context.newPage();
  
  await page.goto('https://news.ycombinator.com', { waitUntil: 'networkidle', timeout: 30000 });
  
  // 提取热点数据
  const stories = await page.evaluate(() => {
    const items = document.querySelectorAll('.athing');
    return Array.from(items).slice(0, 15).map((item, i) => {
      const titleEl = item.querySelector('.titleline a');
      const scoreEl = document.querySelectorAll('#main-table span.score')[i];
      return {
        rank: i + 1,
        title: titleEl?.textContent?.trim() || '',
        url: titleEl?.href || '',
        score: scoreEl?.textContent?.trim() || ''
      };
    });
  });
  
  console.log(JSON.stringify(stories, null, 2));
  
  await page.close();
  await browser.close();
})();

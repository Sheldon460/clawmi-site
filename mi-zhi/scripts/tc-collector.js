const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  try {
    console.log('📡 采集 TechCrunch AI...');
    const browser = await chromium.connectOverCDP('http://127.0.0.1:56684', { timeout: 10000 });
    const context = browser.contexts()[0];
    const page = await context.newPage();
    
    await page.goto('https://techcrunch.com/category/artificial-intelligence/', { 
      waitUntil: 'networkidle', 
      timeout: 45000 
    });
    
    const articles = await page.evaluate(() => {
      const items = document.querySelectorAll('article');
      return Array.from(items).slice(0, 10).map(item => {
        const titleEl = item.querySelector('h2 a, h3 a');
        const excerptEl = item.querySelector('.excerpt, .summary');
        const timeEl = item.querySelector('time');
        return {
          title: titleEl?.textContent?.trim() || '',
          url: titleEl?.href || '',
          excerpt: excerptEl?.textContent?.trim() || '',
          time: timeEl?.dateTime || ''
        };
      }).filter(a => a.title);
    });
    
    console.log(JSON.stringify(articles, null, 2));
    
    await page.close();
    await browser.close();
    console.log('✅ TechCrunch 采集完成');
  } catch (error) {
    console.error('❌ 采集失败:', error.message);
    process.exit(1);
  }
})();

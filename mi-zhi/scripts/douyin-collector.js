const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  try {
    console.log('📡 采集抖音热点...');
    const browser = await chromium.connectOverCDP('http://127.0.0.1:56684', { timeout: 10000 });
    const context = browser.contexts()[0];
    const page = await context.newPage();
    
    await page.goto('https://www.douyin.com', { 
      waitUntil: 'networkidle', 
      timeout: 45000 
    });
    
    // 等待页面加载
    await page.waitForTimeout(5000);
    
    const content = await page.evaluate(() => {
      return {
        title: document.title,
        textLength: document.body.innerText.length,
        url: window.location.href
      };
    });
    
    console.log('✅ 抖音采集完成:', content);
    
    await page.close();
    await browser.close();
  } catch (error) {
    console.error('❌ 采集失败:', error.message);
    process.exit(1);
  }
})();

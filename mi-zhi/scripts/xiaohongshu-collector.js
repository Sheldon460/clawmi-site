const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  try {
    console.log('📡 采集小红书热点...');
    const browser = await chromium.connectOverCDP('http://127.0.0.1:56684', { timeout: 10000 });
    const context = browser.contexts()[0];
    const page = await context.newPage();
    
    // 测试搜索功能
    await page.goto('https://www.xiaohongshu.com/search_result?keyword=AI', { 
      waitUntil: 'networkidle', 
      timeout: 45000 
    });
    
    // 等待页面加载
    await page.waitForTimeout(5000);
    
    const content = await page.evaluate(() => {
      const notes = document.querySelectorAll('.note-item');
      return {
        title: document.title,
        noteCount: notes.length,
        topNotes: Array.from(notes).slice(0, 5).map(note => {
          const titleEl = note.querySelector('.title');
          return titleEl?.textContent?.trim() || '';
        }).filter(t => t)
      };
    });
    
    console.log('✅ 小红书采集完成:', JSON.stringify(content, null, 2));
    
    await page.close();
    await browser.close();
  } catch (error) {
    console.error('❌ 采集失败:', error.message);
    process.exit(1);
  }
})();

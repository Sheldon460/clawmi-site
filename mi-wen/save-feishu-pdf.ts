import { chromium } from 'playwright';

const url = 'https://my.feishu.cn/docx/P6zsdsgYco6i4XxLeIccvlpvnQe?from=from_copylink';
const outputDir = '/Volumes/My house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output/pdf';
const outputPath = `${outputDir}/feishu-doc-${new Date().toISOString().split('T')[0]}.pdf`;

(async () => {
  const browser = await chromium.launch({
    headless: false,
    executablePath: '/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  
  const page = await browser.newPage();
  console.log('正在打开飞书文档...');
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  
  // 检查是否需要登录
  const currentUrl = page.url();
  if (currentUrl.includes('login') || currentUrl.includes('auth')) {
    console.log('检测到需要登录，请在浏览器中完成登录后按 Enter 继续...');
    process.stdin.once('data', async () => {
      await capturePDF(page, outputPath, browser);
    });
  } else {
    // 等待页面内容加载
    console.log('等待页面内容加载...');
    await page.waitForTimeout(5000);
    await capturePDF(page, outputPath, browser);
  }
})();

async function capturePDF(page: any, outputPath: string, browser: any) {
  try {
    // 滚动页面确保所有内容加载
    await autoScroll(page);
    
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
      fullPage: true
    });
    
    console.log(`✅ PDF 已保存至: ${outputPath}`);
    await browser.close();
    process.exit(0);
  } catch (error) {
    console.error('生成 PDF 失败:', error);
    await browser.close();
    process.exit(1);
  }
}

async function autoScroll(page: any) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

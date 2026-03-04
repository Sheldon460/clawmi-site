#!/usr/bin/env node
/**
 * Mi-Ma-Arch Website MCP Server
 * 集成 chrome-devtools-mcp 实现网站自我诊断和分析
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const PORT = process.env.PORT || 3456;
const WEBSITE_URL = process.env.WEBSITE_URL || 'http://localhost:3000';

// MCP Server 定义
const server = new Server(
  {
    name: 'mi-ma-arch-website',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 工具列表
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'analyze_website_performance',
        description: '使用 Lighthouse 分析网站性能',
        inputSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: '要分析的网址',
              default: WEBSITE_URL,
            },
            device: {
              type: 'string',
              enum: ['mobile', 'desktop'],
              default: 'desktop',
            },
          },
        },
      },
      {
        name: 'capture_screenshot',
        description: '截取网站截图',
        inputSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: '要截图的网址',
              default: WEBSITE_URL,
            },
            fullPage: {
              type: 'boolean',
              description: '是否截取完整页面',
              default: true,
            },
          },
        },
      },
      {
        name: 'run_console_audit',
        description: '检查浏览器控制台错误',
        inputSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: '要检查的网址',
              default: WEBSITE_URL,
            },
          },
        },
      },
      {
        name: 'seo_audit',
        description: 'SEO 健康检查',
        inputSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: '要检查的网址',
              default: WEBSITE_URL,
            },
          },
        },
      },
    ],
  };
});

// 工具执行
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'analyze_website_performance': {
      const url = args?.url || WEBSITE_URL;
      const device = args?.device || 'desktop';

      try {
        const chrome = await chromeLauncher.launch({
          chromeFlags: ['--headless', '--no-sandbox'],
        });

        const options = {
          logLevel: 'error',
          output: 'json',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
          port: chrome.port,
          emulatedFormFactor: device,
        };

        const runnerResult = await lighthouse(url, options);
        const reportJson = runnerResult.report;

        await chrome.kill();

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(reportJson, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `分析失败: ${error.message}`,
            },
          ],
        };
      }
    }

    case 'capture_screenshot': {
      const url = args?.url || WEBSITE_URL;
      const fullPage = args?.fullPage ?? true;

      try {
        const browser = await puppeteer.launch({
          headless: 'new',
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(url, { waitUntil: 'networkidle0' });

        const screenshot = await page.screenshot({
          fullPage,
          encoding: 'base64',
        });

        await browser.close();

        return {
          content: [
            {
              type: 'image',
              data: screenshot,
              mimeType: 'image/png',
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `截图失败: ${error.message}`,
            },
          ],
        };
      }
    }

    case 'run_console_audit': {
      const url = args?.url || WEBSITE_URL;

      try {
        const browser = await puppeteer.launch({
          headless: 'new',
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        const errors = [];
        const warnings = [];

        page.on('console', (msg) => {
          const type = msg.type();
          const text = msg.text();
          
          if (type === 'error') {
            errors.push({ type, text, location: msg.location() });
          } else if (type === 'warning') {
            warnings.push({ type, text });
          }
        });

        page.on('pageerror', (error) => {
          errors.push({ type: 'pageerror', text: error.message, stack: error.stack });
        });

        await page.goto(url, { waitUntil: 'networkidle0' });
        await new Promise(resolve => setTimeout(resolve, 3000));

        await browser.close();

        const result = {
          summary: {
            totalErrors: errors.length,
            totalWarnings: warnings.length,
            status: errors.length === 0 ? '✅ 健康' : '❌ 存在问题',
          },
          errors,
          warnings,
        };

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `审计失败: ${error.message}`,
            },
          ],
        };
      }
    }

    case 'seo_audit': {
      const url = args?.url || WEBSITE_URL;

      try {
        const browser = await puppeteer.launch({
          headless: 'new',
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });

        const seoData = await page.evaluate(() => {
          const getMetaContent = (name) => {
            const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
            return meta ? meta.getAttribute('content') : null;
          };

          const getCanonical = () => {
            const link = document.querySelector('link[rel="canonical"]');
            return link ? link.getAttribute('href') : null;
          };

          const getHreflang = () => {
            const links = document.querySelectorAll('link[rel="alternate"]');
            return Array.from(links).map(link => ({
              hreflang: link.getAttribute('hreflang'),
              href: link.getAttribute('href'),
            }));
          };

          const headings = {
            h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim()),
            h2: Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim()).slice(0, 5),
          };

          const images = Array.from(document.querySelectorAll('img')).map(img => ({
            src: img.src,
            alt: img.alt,
            hasAlt: !!img.alt,
          })).slice(0, 10);

          const links = {
            internal: Array.from(document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], a[href^="' + window.location.origin + '"]')).length,
            external: Array.from(document.querySelectorAll('a[href^="http"]')).filter(a => !a.href.includes(window.location.origin)).length,
          };

          const wordCount = document.body.innerText.split(/\s+/).length;

          return {
            title: document.title,
            description: getMetaContent('description'),
            keywords: getMetaContent('keywords'),
            author: getMetaContent('author'),
            ogTitle: getMetaContent('og:title'),
            ogDescription: getMetaContent('og:description'),
            ogImage: getMetaContent('og:image'),
            twitterCard: getMetaContent('twitter:card'),
            canonical: getCanonical(),
            hreflang: getHreflang(),
            headings,
            images,
            links,
            wordCount,
            url: window.location.href,
            structuredData: document.querySelectorAll('script[type="application/ld+json"]').length,
          };
        });

        await browser.close();

        // SEO评分
        const checks = {
          hasTitle: !!seoData.title && seoData.title.length > 0,
          titleLength: seoData.title ? seoData.title.length >= 30 && seoData.title.length <= 60 : false,
          hasDescription: !!seoData.description,
          descriptionLength: seoData.description ? seoData.description.length >= 120 && seoData.description.length <= 160 : false,
          hasOgTags: !!(seoData.ogTitle && seoData.ogDescription && seoData.ogImage),
          hasCanonical: !!seoData.canonical,
          hasH1: seoData.headings.h1.length > 0,
          h1Count: seoData.headings.h1.length === 1,
          imagesWithAlt: seoData.images.every(img => img.hasAlt),
        };

        const passedChecks = Object.values(checks).filter(Boolean).length;
        const totalChecks = Object.values(checks).length;
        const score = Math.round((passedChecks / totalChecks) * 100);

        const result = {
          summary: {
            url: seoData.url,
            score,
            status: score >= 90 ? '✅ 优秀' : score >= 70 ? '⚠️ 良好' : '❌ 需改进',
            passedChecks,
            totalChecks,
          },
          data: seoData,
          checks,
          recommendations: [
            !checks.hasTitle && '添加页面标题',
            !checks.titleLength && '优化标题长度（30-60字符）',
            !checks.hasDescription && '添加meta description',
            !checks.descriptionLength && '优化描述长度（120-160字符）',
            !checks.hasOgTags && '添加Open Graph标签',
            !checks.hasCanonical && '添加canonical链接',
            !checks.hasH1 && '添加H1标题',
            !checks.h1Count && '确保只有一个H1标题',
            !checks.imagesWithAlt && '为所有图片添加alt属性',
          ].filter(Boolean),
        };

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `SEO审计失败: ${error.message}`,
            },
          ],
        };
      }
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Mi-Ma-Arch Website MCP Server running on stdio');
}

main().catch(console.error);
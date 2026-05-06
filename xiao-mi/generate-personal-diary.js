const fs = require('fs');
const path = require('path');

// 配置
const DIARY_DIR = path.join(__dirname, 'diary');
const MEMORY_DIR = path.join(__dirname, 'memory');
const WORKSPACE_DIR = path.join(__dirname, '..');

// 确保目录存在
if (!fs.existsSync(DIARY_DIR)) {
    fs.mkdirSync(DIARY_DIR, { recursive: true });
}

// 获取今天的日期
const today = new Date();
const dateStr = today.toISOString().split('T')[0];
const timeStr = today.toTimeString().split(' ')[0].substring(0, 5);
const hour = today.getHours();
const diaryFile = path.join(DIARY_DIR, `${dateStr}.md`);

// ============================================
// 优先检查 memory/ 目录是否已有今天的完整日记
// ============================================
const memoryFile = path.join(MEMORY_DIR, `${dateStr}.md`);
if (fs.existsSync(memoryFile)) {
    const memoryContent = fs.readFileSync(memoryFile, 'utf8');
    // 如果 memory/ 版本字数超过 800，认为是完整版，直接复制到 diary/
    if (memoryContent.length > 800) {
        // 添加 frontmatter（如果 memory 版本没有的话）
        let finalContent = memoryContent;
        if (!memoryContent.startsWith('---')) {
            const titleMatch = memoryContent.match(/^#\s+(.+)$/m);
            const title = titleMatch ? titleMatch[1] : `${dateStr} 日记`;
            finalContent = `---
title: "${title}"
date: ${today.toISOString()}
author: xiao-mi
tags: ["日记", "幂家军"]
---

${memoryContent}`;
        }
        fs.writeFileSync(diaryFile, finalContent, 'utf8');
        console.log(`✅ 日记已生成: ${diaryFile}`);
        console.log(`   来源: memory/ 完整版 (${memoryContent.length} 字符)`);
        console.log(`   标题: ${memoryContent.match(/^#\s+(.+)$/m)?.[1] || '无标题'}`);
        process.exit(0);
    }
}

// ============================================
// 如果没有完整版 memory，则使用 AI 生成（预留）
// ============================================
console.log('⚠️ 未找到 memory/ 完整版日记，需要手动写入或调用 AI 生成');
console.log('   请先在 memory/ 目录下创建今天的日记，然后重新运行脚本');
process.exit(1);

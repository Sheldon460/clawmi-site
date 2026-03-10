# main 心跳检查任务

> 定期检查系统状态和技能规范性

---

## 📅 每月检查 (每月 1 日执行)

### 技能目录规范性检查

**检查时间**: 每月 1 日 09:00  
**负责人**: main (幂 Claw)  
**协助**: mi-ren (HR)

**检查清单**:

```bash
# 1. 检查共享技能目录
ls ~/.openclaw/skills/ | wc -l
# 预期：≥10 个技能

# 2. 检查非标准路径是否存在
ls -la ~/.agents/skills/ 2>&1
# 预期：Directory not found

# 3. 检查各 Agent 专属技能目录
for agent in mi-*; do
  echo "=== $agent ==="
  ls workspace/$agent/skills/ 2>/dev/null || echo "无专属技能"
done

# 4. 验证技能加载状态
openclaw status | grep -i skill
```

**记录位置**: `main/docs/monthly-skill-audit-YYYY-MM.md`

---

## 📊 每季度审查 (每季度首月 5 日执行)

**检查时间**: 1/4/7/10 月 5 日  
**负责人**: main + mi-ma-arch

**审查内容**:
- [ ] 技能使用频率分析
- [ ] 技能更新检查 (ClawHub)
- [ ] 技能规范遵守情况
- [ ] 新技能需求收集

**记录位置**: `main/docs/quarterly-skill-review-YYYY-Qn.md`

---

## 🎯 年度技能盘点 (每年 12 月执行)

**检查时间**: 12 月 15 日  
**负责人**: main + mi-ling + mi-ma-arch

**盘点内容**:
- [ ] 全年技能安装/卸载统计
- [ ] 技能规范违规记录
- [ ] 技能对工作效率的影响
- [ ] 下一年技能规划

**记录位置**: `main/docs/annual-skill-report-YYYY.md`

---

## 📝 检查报告模板

```markdown
# 技能目录规范性检查报告

**日期**: YYYY-MM-DD  
**检查者**: main

## 检查结果

| 检查项 | 预期 | 实际 | 状态 |
|--------|------|------|------|
| 共享技能数量 | ≥10 | X 个 | ✅/❌ |
| 非标准路径 | 无 | 有/无 | ✅/❌ |
| 专属技能目录 | 规范 | 规范/不规范 | ✅/❌ |

## 发现问题

(如有问题，详细记录)

## 整改措施

(如有问题，列出整改计划)

## 下次检查

下次检查日期：YYYY-MM-DD
```

---

## 🔔 提醒机制

**每月提醒**: mi-ren 在每月 1 日提醒 main 执行检查

**提醒内容**:
```
@main 本月技能目录规范性检查时间到了！

检查清单：
1. 共享技能目录检查
2. 非标准路径清理
3. Agent 专属技能检查
4. 生成检查报告

详见：main/HEARTBEAT.md
```

---

*最后更新：2026-03-10*  
*版本：V1.0*  
*下次检查：2026-04-01*

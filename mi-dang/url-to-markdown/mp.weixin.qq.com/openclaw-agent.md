---
url: https://mp.weixin.qq.com/s/RTNjcze2Aak0ekAgmd41tQ
title: "OpenClaw 多 Agent 协作实战完全教程"
description: "先关注后阅读，娇姐怕失去上进的你你已经装好了 OpenClaw，也配置了几个 Agent——intel 负责收"
author: "娇姐"
captured_at: "2026-03-09T21:27:52.041Z"
---

# OpenClaw 多 Agent 协作实战完全教程

## ![图片](https://mmbiz.qpic.cn/mmbiz_jpg/ZMdzBxSXPAAhIboL0WuwtFicPzJcfX6r4IezYFZibeoTgtEAlr8tBIiabYv0fc9W0k2Elf4gVupWoNYPVpon9j6JTPTGsqSTMSZNZmTwiaw5pyk/640?wx_fmt=jpeg&from=appmsg&watermark=1&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=0)

## 先关注后阅读，娇姐怕失去上进的你

你已经装好了 OpenClaw，也配置了几个 Agent——intel 负责收集资讯，wechat 负责写文章，coder 负责写代码。每个 Agent 单独用都没问题。

但你很快发现一件事：**它们互相不知道对方的存在。**你得把 intel 的结果复制出来，再粘贴给 wechat，手动当它们之间的传话筒。

这篇教程就是写给这个阶段的人的——已经有多个 Agent 在跑，想让它们真正协同起来，不再靠人工中转。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ZMdzBxSXPAAzHG5ozpfq3zxmV8wiaz6iaRIFtzp0AqgMQkwkeXtj99RyMuAKpANcO5QwwJ04Zp0Qic2HoFdOfArxSdCI74VxS6PUNFo2eVQ1l4/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

## 0 核心概念：两种模式，不要混淆

OpenClaw 多 Agent 有两种根本不同的运行模式。混淆这两种模式是配置出错最常见的原因：

|
模式

 |

是什么

 |

生命周期

 |
| --- | --- | --- |
|

持久 Agent

 |

独立存在，有自己的配置、记忆、频道绑定

 |

永久运行

 |
|

子 Agent（Sub-agent）

 |

从某个会话临时派生，执行单次任务后自动归档

 |

任务完成后归档

 |

> **注意：**群聊协作用的是持久 Agent；子 Agent 调用走的是 sessions\_spawn。两者的配置字段完全不同，搞混了配置会直接失效或报错。

本教程介绍四种打破 Agent 隔离的通信工具：

|
工具

 |

用途

 |

默认状态

 |
| --- | --- | --- |
|

群聊历史共享

 |

同群 Bot 通过消息历史间接共享上下文

 |

需配置 groupPolicy

 |
|

sessions\_spawn

 |

主 Agent 派生临时子 Agent 执行任务

 |

需配 allowAgents 白名单

 |
|

agentToAgent / sessions\_send

 |

持久 Agent 之间直接发消息

 |

默认关闭，需显式开启

 |
|

共享文件

 |

Agent 通过读写文件异步传递数据

 |

无需配置，但需约定协议

 |

## 方案一　群聊协作（最直观，今天就能用）

把多个持久 Agent 的 bot 拉进同一个群，通过 @ 提及来触发不同 Agent。每个 Agent 被触发时能读到群里的历史消息，包括其他 Agent 之前的回复——这就是上下文共享的原理。

### 配置：openclaw.json

```
{  "channels": {    "telegram": {      "groupPolicy": "allowlist",      "groups": { "allowlist": ["-100xxxxxxx"] }    },    "feishu": {      "requireMention": true    },    "slack": {      "channels": {        "C_YOUR_CHANNEL_ID": {          "allow": true,          "requireMention": true,          "allowBots": true        }      }    }  }}
```

> **注意：**飞书和 Slack 必须设 `requireMention: true`，否则每条消息都触发，多个 Bot 会互相触发陷入死循环。

### 实际交互效果

```
你: @intel 最近 AI 行业有什么重要新闻？intel: [回复 3 条重要新闻]你: @wechat 把 intel 刚才说的第一条新闻写成公众号文章wechat: [基于群里 intel 的回复，写出完整文章]# 原理：wechat 被 @ 时，群历史消息全量进入其上下文窗口
```

适合场景：日常协作、需要人工协调、透明度要求高的流程。

## 方案二　子 Agent 调用（最高效，最省钱）

主 Agent 通过 `sessions_spawn` 工具派生一个临时子 Agent，子 Agent 只把最终结论返回，中间过程不污染主 Agent 的会话历史。

### sessions\_spawn 完整参数

```
{  "task": "收集最近 7 天 AI 重要动态",   // 必填  "label": "intel-daily",               // 便于 /subagents list 识别  "agentId": "intel",                   // 指定哪个 Agent 执行  "model": "anthropic/claude-haiku-3.5",// 单次覆盖模型（省钱关键）  "thinking": "none",                   // 关闭扩展思考  "runTimeoutSeconds": 300,             // 超时保护，5 分钟  "cleanup": "delete"                   // 完成后立即归档}
```

### 必须配置的权限白名单（最常见的坑）

> **注意：**`allowAgents` 只能放在 `agents.list[]` 的具体 Agent 条目里，**不能放 agents.defaults 里**。放错位置会导致 Gateway 启动时配置校验报错崩溃

```
// ✅ 正确写法{  "agents": {    "list": [      {        "id": "main",        "subagents": {          "allowAgents": ["intel", "wechat", "content-curator"]          // 或写 ["*"] 允许调用所有 Agent        }      }    ]  }}// ❌ 错误写法——会导致 Gateway 启动崩溃// "agents": { "defaults": { "subagents": { "allowAgents": [...] } } }
```

### 两个重要冲突

> `agentToAgent.enabled: true` 与 sessions\_spawn 冲突。同时开启时，子 Agent 会出现在 sessions 列表但 totalTokens 永远是 0，永不执行。二选一，不能同时用。
>
> `runTimeoutSeconds` 目前不能在 agents.defaults 里设全局默认值，必须在每次 sessions\_spawn 调用里单独传入。忘记设的话子 Agent 跑飞了不会自动停。

### 子 Agent 的上下文注入（天然省钱）

子 Agent 系统提示比主 Agent 少注入多个文件，基础开销天然更低：

|
文件

 |

主 Agent

 |

子 Agent

 |
| --- | --- | --- |
|

AGENTS.md

 |

注入

 |

注入

 |
|

TOOLS.md

 |

注入

 |

注入

 |
|

SOUL.md

 |

注入

 |

不注入（省 Token）

 |
|

IDENTITY.md / USER.md 等

 |

注入

 |

不注入（省 Token）

 |

### 全局配置

```
{  "agents": {    "defaults": {      "subagents": {        "model": "anthropic/claude-haiku-3.5",  // 子 Agent 默认便宜模型        "maxConcurrent": 8,                     // 全局并发上限        "archiveAfterMinutes": 60,              // 完成后 60 分钟自动归档        "maxChildrenPerAgent": 5                // 每个 session 最多 5 个子 Agent      }    }  }}
```

### 嵌套子 Agent：三层流水线（进阶）

开启 maxSpawnDepth: 2 后，可实现「主 Agent → 编排子 Agent → 工作子 Agent」三层模式：

|
深度

 |

角色

 |

能否再派生？

 |
| --- | --- | --- |
|

0（主）

 |

主 Agent

 |

始终可以

 |
|

1

 |

编排子 Agent

 |

maxSpawnDepth≥2 时可以

 |
|

2（叶）

 |

工作子 Agent

 |

永不可以

 |

> **注意：**社区反映嵌套子 Agent 行为有时不稳定。建议先用 maxSpawnDepth: 1 的单层模式验证后再尝试深度 2。

## 方案三　agentToAgent 持久 Agent 直接通信

sessions\_send 工具允许持久 Agent 之间像打「内线电话」一样直接发消息，不需要用户在群里中转。适合「主管 + 专家」长期协作模式。

### 配置：必须显式开启

```
{  "tools": {    "agentToAgent": {      "enabled": true,      "allow": ["main", "intel", "wechat", "coder"]    }  }}
```

>  **重要提醒：**agentToAgent.enabled: true 与 sessions\_spawn 冲突，两者不能同时使用。如果你还需要派生临时子 Agent，目前只能用方案二，暂时不要开 agentToAgent。

### 协作架构图

用户发指令 → 主管 Agent (main) 接收

↓

判断任务类型，sessions\_send 分配给专家

↙　　　↓　　　↘

intel　　wechat　　coder

↘　　　↓　　　↙

主管 Agent 汇总结果 → 回复用户

## 方案四　共享文件协作（最低成本，全异步）

多个 Agent 通过读写共享目录里的文件传递信息，适合定时任务和异步场景。这是当前 Bug #5813 尚未修复期间最稳定的变通方案。

### 约定协议示例

```
# intel 的 AGENTS.md（写入端）完成资讯收集后，写入：- ~/clawd/shared/intel-latest.md       → 最新资讯（每次覆盖）- ~/clawd/shared/intel-to-wechat.md    → 专门给 wechat 的素材# wechat 的 AGENTS.md（读取端）写作前：1. 读取 ~/clawd/shared/intel-to-wechat.md2. 检查文件时间戳：超过 6 小时标记为「陈旧」，提示用户确认
```

### 配合 Cron 实现全自动流水线

```
# 每天 8:00 收集资讯openclaw cron add --every 24h --at 08:00 --agent intel \  "收集过去 24 小时 AI 动态，写入 ~/clawd/shared/intel-latest.md"# 每天 9:00 写文章（intel 完成后）openclaw cron add --every 24h --at 09:00 --agent wechat \  "读取 ~/clawd/shared/intel-latest.md，写一篇公众号文章草稿"
```

> **成功：**早上 10 点你打开飞书，wechat 发来文章草稿。全程无需人工干预。

## 四种方案对比

|
方案

 |

实时性

 |

自动化

 |

成本

 |
| --- | --- | --- | --- |
|

群聊协作

 |

实时

 |

需人工

 |

较高

 |
|

子 Agent

 |

实时

 |

全自动

 |

低

 |
|

agentToAgent

 |

实时

 |

全自动

 |

中

 |
|

共享文件

 |

异步

 |

全自动

 |

最低

 |

> **注意：**方案二（sessions\_spawn）和方案三（agentToAgent）目前不能同时使用（Bug #5813）。选择前先想清楚你更需要哪个。

## 优先级速查表

|
优先级

 |

操作

 |

原因

 |
| --- | --- | --- |
|

P0

 |

飞书/Slack 群设 requireMention: true

 |

防 Bot 互相触发死循环

 |
|

P0

 |

allowAgents 只放 agents.list\[\]

 |

放 defaults 导致 Gateway 崩溃（#11982）

 |
|

P0

 |

agentToAgent 与 sessions\_spawn 二选一

 |

同时开启导致子 Agent 永不执行（#5813）

 |
|

P1

 |

sessions\_spawn 每次传 runTimeoutSeconds

 |

无全局默认值，忘设子 Agent 可能跑飞（#19288）

 |
|

P1

 |

sessions\_spawn 传 model: haiku

 |

最直接的省钱手段

 |
|

P1

 |

agentToAgent.allow 用最小权限白名单

 |

不是所有 Agent 都需要和所有人通信

 |
|

P2

 |

共享文件约定 .lock 文件防并发写入

 |

没有内置锁机制，需手动约定协议

 |
|

P2

 |

验证 maxSpawnDepth: 2 行为一致后再用

 |

社区反映行为不稳定，先单层验证（#17511）

 |

## 从哪里开始

**第一步**　先试群聊协作——配置最简单，今天就能验证多 Agent 上下文共享是否生效

↓

**第二步**　确认群聊正常后，在 AGENTS.md 里加 sessions\_spawn 规则（记得配 allowAgents）

↓

**第三步**　测试子 Agent 时，先不要开 agentToAgent，避免触发 Bug #5813

↓

**第四步**　基础流程跑通后，加 Cron + 共享文件实现全自动异步任务

> **提示：**遇到奇怪的行为时，先升级 OpenClaw 版本，再用 `/subagents list` 和 `/subagents log` 检查子 Agent 实际运行状态，而不是反复修改配置猜原因。

## 常见问题排查

问题一：@ 了没有任何反应

**原因：**飞书应用没有群聊消息权限

**解决：**进入飞书开放平台 → 找到你的应用 → 权限管理 → 开启 `im:message.group_at_msg` 权限，重新发布应用版本

问题二：群里只有一个 bot 响应，其他 bot 没动静

**原因：**这是正常行为

**说明：**飞书群里 @ 谁谁响应，没有被 @ 的 bot 不会动。这正是 `requireMention: true` 生效的表现，不是 bug。

问题三：多个 bot 同时响应，没有 @ 的也在说话

**原因：**`requireMention` 没有生效

**解决：**检查 openclaw.json，找到飞书频道配置，确认是否有这一行：

```
"feishu": {  "requireMention": true   // 必须是 true，不能缺，不能是 false}
```

改完记得重启 Gateway 让配置生效。

今天就分享到这里了，我建立了 一个openclaw养虾互助社群，有兴趣可以私kekohu。

关于openclaw的系列文章，可以参考如下：

[OpenClaw 省 Token 实操手册：八个维度，节省 60–90%](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490649&idx=1&sn=08c452b5d475f51fc04a817f6bc3759e&scene=21#wechat_redirect)

[OpenClaw 到底怎么跑？部署方式与玩法全景](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490626&idx=1&sn=856bcda284778c7f1958099090c8cd69&scene=21#wechat_redirect)

[彻底搞懂 OpenClaw 配置体系：这才是 AI Agent 的正确打开方式](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490620&idx=1&sn=0300de56bfea0a8b84e04f5107b64f49&scene=21#wechat_redirect)

[本地部署 OpenClaw 自动发布小红书：小白完整教程](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490612&idx=1&sn=af3299a702a501fca48b95a8eb2950e4&scene=21#wechat_redirect)

[我的OpenClaw 多Agent 会主动发来 “上班打卡”](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490607&idx=1&sn=04c5403859ebf2c272a4080f6ecf1688&scene=21#wechat_redirect)

[12类人群必装的OpenClaw Skills](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490599&idx=1&sn=172e4e47f1e08846f9c855b0eb6e872b&scene=21#wechat_redirect)

[OpenClaw 排错指南](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490594&idx=1&sn=3fc9084e68fcf127b2a81e191e6ec202&scene=21#wechat_redirect)

[不写代码，如何让 OpenClaw Agent 学会新技能](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490582&idx=1&sn=3d2d37e6aedfd24b030d804b9b137fe6&scene=21#wechat_redirect)

[OpenClaw 实战：从0到1搭建你的云端AI工作流](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490581&idx=1&sn=23d7c53df5f4d699f1e3efd34366ab8e&scene=21#wechat_redirect)

[看看这个龙虾速度，就知道这OpenClaw有多火，速度跟上](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490590&idx=1&sn=76936a94d1feff706b01dd1b845f0ce2&scene=21#wechat_redirect)

[不写代码，如何让 OpenClaw Agent 学会新技能](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490582&idx=1&sn=3d2d37e6aedfd24b030d804b9b137fe6&scene=21#wechat_redirect)

[OpenClaw 曲线救国：通过 CLI 后端使用 Claude 模型](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490535&idx=1&sn=19ce4485617f51d57d5a131cd654471f&scene=21#wechat_redirect)

[OpenClaw 官方 53 个技能完整指南：功能详解 + 风险评估 + 安装建议](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490487&idx=1&sn=e57116b26bbba0d0cd51adced57e3ad2&scene=21#wechat_redirect)

[OpenClaw 多代理配置指南：让 AI 团队帮你同时干多件事](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490477&idx=1&sn=c088999826fc5854f2a1b718a7030733&scene=21#wechat_redirect)

[OpenClaw 完全指南：从零搭建你的 AI 员工团队](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490462&idx=1&sn=06a6c98fef300fcc3b0c08151c9a857d&scene=21#wechat_redirect)

[如何申请 Brave Search API 密钥并配置 OpenClaw](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490456&idx=1&sn=63929ff62cebbf6c835c51c9d2e4943d&scene=21#wechat_redirect)

[OpenClaw 实战操作指南：12大热门应用案例详细教程](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490451&idx=1&sn=de4f66f6633ce09980d4ee7a76f84f86&scene=21#wechat_redirect)

[飞书跟openclaw集成实操教程](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490450&idx=1&sn=cfa450b6fd6c587f568489af5211502c&scene=21#wechat_redirect)

[OpenClaw 命令完整手册](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490430&idx=1&sn=ea409cefa766662fa25cdd9e0ae056ad&scene=21#wechat_redirect)

[用上了openclaw，跟telegram能双向通信了](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490256&idx=1&sn=ddfa81166c5e9f963b9d21a0a699b0ef&scene=21#wechat_redirect)

[【该文为openclaw输出】OpenClaw超简单且免费的安装实操教程](https://mp.weixin.qq.com/s?__biz=MzkyNDY2ODU2MA==&mid=2247490210&idx=1&sn=1abb4f382a117f6c78acd1cacff985df&scene=21#wechat_redirect)

关注娇姐，持续分享AI干货和资讯。
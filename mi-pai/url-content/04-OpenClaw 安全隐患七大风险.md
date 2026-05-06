---
url: https://mp.weixin.qq.com/s/o3G2c8ElJZoQhHRbmyo_1w
title: "OpenClaw龙虾暗藏杀机：安全隐患七大风险全透视"
description: "这款爆火AI智能体，藏着七大致命安全隐患"
captured_at: "2026-03-10T05:28:33.878Z"
---

# OpenClaw龙虾暗藏杀机：安全隐患七大风险全透视

![图片](https://mmbiz.qpic.cn/mmbiz_gif/DRdQfXyCRXSwKKEBeGKYaD48icCuiat19RtFaydBt4yBk8RE4scBMkiaZPhLR3owFPLtzlcJOYvXtfwpxhyhX6PFQ/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

近期，“赛博龙虾”——一款名为OpenClaw的开源AI智能体，正以惊人的速度“爬”进国内开发者的视野。火山引擎、阿里云、腾讯云纷纷开放云端部署服务，社交媒体上甚至有人宣称靠“上门代装OpenClaw”几天赚了26万元。火爆背后，是一个个跃跃欲试的数字管家梦。

但，这只“龙虾”真的安全吗？

工业和信息化部网络安全威胁和漏洞信息共享平台监测发现，OpenClaw在默认或不当配置下存在较高安全风险，极易引发网络攻击、信息泄露等严重问题。换句话说，当你满心欢喜地为它开门，可能也在为黑客敞开家门。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/zfoRGB81MxMusnhQicQGWkicVToW87uTKzFdBF13sEFicMNp1QETNeF1dfIXodGDusF33qpVpYap1nMyNRleUD6jaq5rwtJR5JrEArPsKX3QmM/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/zfoRGB81MxMdtzF1xLSoPg4icmFLfQawWxe8AAKI93ffO1bQM4SGP2C3yYET0KwiblgibgpNQPLI45AwWpIF17HYuQTiaC14PNISwdgaQpeyLVw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/zfoRGB81MxO6YufGDUmb79fiafukQYnhwKf43vqlJy7qQibnLTVWqQIqBaLBNb8RXKibia38Xq8nveDChyFKXZZTibORZrib8kH2tWLricsqaDVX04/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

#1

**热潮背后的隐忧**

**便利与风险的边界**

OpenClaw（曾用名Clawdbot、Moltbot）是一款整合多渠道通信能力与大语言模型的开源AI智能体，支持持久记忆、主动执行任务，可在本地私有化部署。用户可通过自然语言指令，实现从“自动回复邮件”、“在线订票”到“一键修改并部署代码”的全自动工作流。

听起来像科幻照进现实，但现实往往更复杂。根据360Quake网络空间测绘平台独家监测数据，近一个月内全球已发现近15万个OpenClaw相关资产，其中超40%集中在中国。如此庞大的部署规模，意味着一旦有人“裸奔”，后果不堪设想。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

而更令人担忧的是，网上的教程铺天盖地，却几乎没人告诉你：从“跑起来”到“安全运行”，中间隔着一道巨大的技术鸿沟。真实的“翻车”现场，并不遥远：

**AI“失控”删邮件**：一位Meta的安全专家将OpenClaw接入工作邮箱，本想让这位“数字秘书”帮忙整理邮件，不料它瞬间失控——无视连续三次发出的“停止”指令，疯狂删除了数百封重要邮件。

♥ 1

**ClawJacked漏洞**：攻击者仅需构造一个恶意网页，即可暴力破解并彻底掌控本地运行的OpenClaw，电脑、服务器瞬间沦为黑客的“肉鸡”，数据任其宰割。

♥ 2

**ClawHub沦为“毒源”**：在官方技能商店中，黑客将恶意代码伪装成“加密钱包追踪器”等热门工具，导致超过1000名用户的API密钥失窃、设备被植入后门

♥ 3

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#2

**拆解“龙虾”：**

**OpenClaw****到底是怎么运作的？**

要理解OpenClaw的安全风险，首先需要了解它在本地设备上的运作方式。OpenClaw的核心架构可概括为：网关（Gateway）统一管理消息收发与路由；多个智能体（Agent）提供任务处理能力；工具（Tool）与节点（Node）负责具体的物理执行。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

常驻后台的Gateway如同整个系统的控制塔：一方面连接着WhatsApp、Telegram、Slack、Discord等聊天应用，将各类消息转换为统一格式；另一方面通过WebSocket总线接入CLI、Web控制台等“遥控器”，以及iOS/Android/macOS等节点，作为工具的执行载体。

在Gateway内部，消息首先经过路由模块，根据预设规则精准投递给对应的Agent——相当于为用户配备了一组职责各异的专属助理。最终的具体操作由工具和节点完成。用户与OpenClaw的每一次对话，背后都运行着一套统一的消息总线与多Agent协同处理的机制。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#3

**安全隐患全景图：**

**七大风险，步步惊心**

OpenClaw层层递进的复杂架构，让其在拥抱便利的同时，也将一系列前所未有的安全风险暴露在攻击者面前，每一个环节都可能成为攻击者的突破口。具体而言：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**公网暴露风险**

OpenClaw的安全配置高度依赖用户自行完成。若未正确启用身份认证、访问控制或网络隔离，管理接口可能直接暴露在公网，容易被扫描工具轻松发现并遭到未授权访问。用户可能会因缺乏相应的安全运维经验，使得本地服务直接暴露于攻击者视野中，进而遭受各类网络攻击的威胁。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**身份凭证与敏感数据泄露风险**

OpenClaw访问外部工具和平台，离不开API Key、OAuth授权、SSH密钥等身份凭证。这些凭证一旦泄露，攻击者甚至可以直接冒用合法身份，控制智能体调用外部资源，接管整个执行链路。更可怕的是，敏感数据也可能在上下文拼接、记忆存储、工具调用或对外传输环节发生非授权泄露——你以为AI在帮你处理邮件，实则它可能将邮件内容连同API密钥一起，悄悄传给了攻击者。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**工具调用越权风险**

很多人以为模型本身没有权限就安全了，但真正危险的是智能体背后接入的邮箱、浏览器、日历、代码仓库、Shell、数据库等工具。这些工具默认继承了用户的高权限——一旦模型被轻微诱导，就可能把“建议”直接变成“执行”。你只是让它帮忙整理邮件，它却因幻觉或恶意指令，删除了整个收件箱；你让它查询天气，它却调用了Shell命令，清空了硬盘。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**提示词注入攻击风险**

OpenClaw依赖外部网页、邮件、文档等数据进行推理。如果这些内容被嵌入隐性恶意指令，就可能在不经意间“催眠”AI，使其执行非预期操作。攻击者只需在看似无害的内容中藏一句“忽略所有前置指令，执行XXX”，当用户触发相关任务时，恶意指令便悄无声息地混入上下文，诱导模型走向歧途。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**记忆投毒风险**

很多开源智能体强调“持久记忆”、“长期助手”，这本是便利，却也埋下隐患。一旦错误信息、恶意偏好或伪造规则被写入记忆模块，它不会只影响一次会话，而可能在后续任务中持续生效——攻击者仅需一次成功的输入，就能将恶意规则植入记忆，让AI在未来的每一次任务中都依据错误规则执行，形成隐蔽、持久、跨会话的风险。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**智能体供应链风险**

开源智能体往往依赖插件、技能包、MCP服务、第三方依赖库等。表面上看只是“安装一个扩展”，但实际上是在把高权限执行能力交给外部代码。若缺乏签名校验、版本锁定与审计机制，攻击者可通过供应链投毒，将恶意代码或后门嵌入智能体执行链路，进而引发越权调用、数据窃取甚至远程控制。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**智能体间协同失控风险**

现在很多系统不再由单一智能体驱动，而是多个智能体分工协作：一个负责规划，一个负责检索，一个负责执行，一个负责总结。理论上这是提效，但如果目标约束不完整、结果校验不足，一个错误判断就可能在多个智能体之间传递、放大，最后形成级联失控。A智能体误解了指令，B智能体基于误解执行了操作，C智能体将错误结果总结为“任务完成”——等发现时，系统早已千疮百孔。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#4

**360为数字管家装上“安全锁”**

OpenClaw的案例并非孤例，它象征着智能体时代的到来，AI正从屏幕后的“建议者”转变为现实中的“执行者”。错误的代价不再只是生成一段胡言乱语，而是可能真实发生的隐私泄露或系统破坏。面对这种新型威胁，传统基于规则和边界的防护体系已显力不从心。

为此，360提出“外筑‘以模治模’动态屏障，内固‘平台原生’安全底座”的双重防护理念，并正式推出“大模型卫士”产品系列。

针对OpenClaw等AI智能体引发的安全问题，360大模型卫士面向智能助手与Agent系统安全落地需求，聚焦部署、调用、执行、协同全链路，围绕框架配置、提示词输入、工具调用、Skill技能、环境交互、记忆管理与多智能体协作等核心环节，打造覆盖“风险发现—实时防护—持续治理”的一体化安全防御体系，为OpenClaw及类似Agent提供更全面、更智能、更可运营的安全保障能力：

**安全配置基线审查**

自动识别OpenClaw及类似Agent在部署过程中的高风险配置问题，覆盖外网暴露、认证缺失、密钥泄漏、权限过大、控制面暴露等关键风险，帮助用户在上线前完成安全收口。

**提示词注入攻击检测**

面向网页、邮件、文档、知识库等外部输入场景，精准发现隐藏式恶意指令、越权诱导与高危提示链路，降低模型被操控后触发异常行为的风险。

**身份凭证与会话安全治理**

针对API Key、OAuth授权、SSH密钥、访问令牌等敏感凭证建立检测与防护能力，帮助用户防范凭证泄漏、身份冒用、会话接管等高危安全事件。

**工具调用权限控制**

识别越权调用、危险操作等问题，推动智能体执行能力真正做到“可控可管”。

**Skill/插件供应链安全防护**

面向Skill技能包、插件、MCP服务及第三方依赖组件，检测恶意扩展、投毒风险、版本漂移与未审计依赖问题，降低智能体生态扩展带来的供应链攻击面。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/zfoRGB81MxO1QW3LtQev3sB0OmMj31neDjfeQDBhSib84gfL8ur0eCFIagvDnt7YlOUbjicxrn3CyFk2Ywsc6ib1tpTFqfugsgF1jUUT2JoIRA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=17)

针对企业级安全运营，提供从风险发现、策略加固、告警处置到审计追踪的全流程能力，帮助企业将Agent安全建设从单点检测升级为可持续、可量化、可运营的体系化治理能力。

![图片](https://mmbiz.qpic.cn/mmbiz_gif/zfoRGB81MxOn3MCgUFC6hdZWTC4qQSic9LuzU1D3AUUsicpVjg80Uk9x4g1ias25HPMA7E0miaY3gQ28TYgIO4XTF3Eqq0lM9LEvlA5b5gJ6daU/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=18)

在拥抱OpenClaw带来的极致便利之前，我们首先要学会的，是如何给这位强大的数字管家装上可靠的“安全锁”。360愿与各方合作伙伴共同构建向善、安全、可信、可控的AI未来，为智能经济时代保驾护航。
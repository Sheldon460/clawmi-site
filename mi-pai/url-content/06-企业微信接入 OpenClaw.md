---
url: https://mp.weixin.qq.com/s/y7JEG-inGA57nwlJk9k8KQ
title: "企业微信正式接入 OpenClaw｜手把手教程"
description: "龙虾从正门，游进微信"
author: "金色传说大聪明"
captured_at: "2026-03-10T05:29:04.274Z"
---

# 企业微信正式接入 OpenClaw｜手把手教程

企业微信的开发者文档里，今天多了这么一个：「**OpenClaw 接入智能机器人**」

![图片](https://mmbiz.qpic.cn/mmbiz_png/jXSGuwJvpdhGbHL3icu4I2iamDvFRwREdNfUKAicSPOlNW9Pw0Hahe6y4kSx0ZmC2eQvwsgZvU4bFDO6oqLmBxnQIZ4hN0EwicSYwvPVP7iclIwI/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

https://open.work.weixin.qq.com/help2/pc/cat?doc\_id=21657

下面这篇文章，会一起把相关的安装部署流程走一遍，从创建机器人到跑通对话，大概十分钟

## 它能做什么

企业微信的智能机器人，现在可以直接跑 OpenClaw。单聊、群聊都行。机器人住在企微的工作台里，你在聊天窗口找到它，发一条消息，它就开始干活

支持的能力有四块：单聊或群聊中直接对话、接入知识集优化回答、通过 API/MCP 插件对接企业内部系统、以及工作流编排

![企微智能机器人主界面](https://mmbiz.qpic.cn/mmbiz_png/jXSGuwJvpdiaYicSFn4qfmru2a3Jg7cF3icRMgpMM75ibhZC6gOuzNGL0D5NoibRbKdzPPqDEXh1UOl4VeiaSn5m1GWDN2u6jVP05iaibU5CriaqiaLGg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1 "null")

企微智能机器人主界面

## 前期准备

两件事

第一，企业微信客户端更新到最新版本

第二，本地电脑装好了 OpenClaw，或者在腾讯云轻量应用服务器（Lighthouse）上部署了 OpenClaw

没有别的前置条件了

## 第一步：在企微里创建机器人

打开企业微信客户端，进入工作台，点「智能机器人」，再点「创建机器人」

进入创建页面后，底部有一行小字：「如需使用自有系统获取成员与机器人的聊天并输出回复，可切换至 API 模式创建」。点「API 模式创建」

![切换到 API 模式创建](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "null")

切换到 API 模式创建

连接方式选「使用长连接」。长连接的好处很实在：不需要域名，不需要公网 IP，本地电脑就能接收消息并返回结果

选好之后，页面上会显示两个东西：`Bot ID` 和 `Secret`。把这两个值复制下来，后面要用

![获取 Bot ID 和 Secret](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "null")

获取 Bot ID 和 Secret

## 第二步：安装企微插件，关联 OpenClaw

打开终端（macOS 上叫 Terminal，Windows 上叫命令提示符或 PowerShell），输入：
`openclaw plugins install @wecom/wecom-openclaw-plugin`

等它跑完，看到 `Installed plugin: openclaw-wecom` 和 `Restart the gateway to load plugins.` 就算装好了

![插件安装成功](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "null")

插件安装成功

接着重启 OpenClaw：
`openclaw gateway start`

然后添加渠道：
`openclaw channels add`

终端会弹出一个列表，让你选 channel。往下翻，找到「企业微信（WeCom）」，选它

![选择企业微信渠道](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "null")

选择企业微信渠道

然后终端会依次让你输入两个东西：Bot ID 和 Secret。就把刚才从企微那边复制的值粘贴进去

![输入 Bot ID 和 Secret](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "null")

输入 Bot ID 和 Secret

选完之后，选「Finished」

![选 Finished](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "null")

选 Finished

## 第三步：配对

终端会问你配对方式，选「Pairing」

![选 Pairing](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "null")

选 Pairing

配置完成后，终端会显示渠道配置成功

![配置成功](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "null")

配置成功

现在回到企业微信。找到刚才创建的机器人，保存它，然后给它发一条消息，随便发个「你好」就行

机器人会回复一段文字，里面有一个配对码（Pairing code），最后一行长这样：

`openclaw pairing approve openclaw-wecom ABFJ22X8`

![企微中收到配对码](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "null")

企微中收到配对码

把这行命令完整复制，粘贴到终端里，回车

![终端中完成配对](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "null")

终端中完成配对

配对完成。回到企微，再发一次「你好」，这次机器人会正常回复了

![正常对话](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "null")

正常对话

到这里，基础的接入就全部跑通了

## 再往前走两步

企微这次给的文档里，附了两个进阶用法

**第一个，智能表格 Webhook**

OpenClaw 可以通过 Webhook 直接往企微的智能表格里写数据。在智能表格中开启「接收外部数据」后，系统会生成一个唯一的 Webhook 地址，通过标准的 HTTP POST 请求就能新增或更新记录

适用场景包括：外部系统数据自动同步、客户信息自动录入、工单状态自动更新等等

![智能表格 Webhook 适用场景](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "null")

智能表格 Webhook 适用场景

详细配置可以参考企微开发者文档：接收外部数据到智能表格`https://developer.work.weixin.qq.com/document/path/101239`

**第二个，调用企微 API**

如果想让 OpenClaw 做更多事情（比如创建文档、读写日程、管理通讯录），需要再多拿两个参数：企业 ID（corpid）和应用 Secret

获取方式也简单。企业 ID 在管理后台的「我的企业」页面底部能看到

![获取企业 ID](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "null")

获取企业 ID

应用 Secret 在「应用管理」里，进入自建应用，点「查看」，Secret 会发到你的消息列表里

![获取应用 Secret](https://mmbiz.qpic.cn/mmbiz_png/jXSGuwJvpdiaGkGRrPOTeciceGbuG5G28YkUGiblBS9068fEC6tkLOguiboflibcHUDfc0lEiaoCtUjvhq007iacCicFX6uRfkFPB54nbjX86xmubdI/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=15 "null")

获取应用 Secret

拿到这两个值之后，发给已经关联 OpenClaw 的机器人，它就能发起获取 access token 的请求，具体文档在这：
`https://developer.work.weixin.qq.com/document/path/91039`

再通过 access token 调用企微的各类 API，比如文档 API

## 最后

长连接模式适合本地部署或轻量云服务器，启动方便，但 OpenClaw 进程关掉之后机器人就断了。如果需要 7×24 小时在线，建议用云服务器部署，保持进程常驻

Pairing 配对方式默认一个用户一个会话。如果想让多个人各自有独立的对话上下文，需要在配置里调整 `session.dmScope` 参数

另外，这次官方文档里写的命令和包名都带着 `@wecom` 前缀和 `@tencent` 的 scope。从截图上看，插件版本号跟着 OpenClaw 的 2026.3.x 走。看得出来，企微团队在 OpenClaw 的插件生态里按照标准流程做了接入，走的正路

至于个人微信那边....这次没有提到

有些种子不需要什么特别的土壤，只需要一片空地
今天这片空地，好像多了一小块
# Google GenMedia GCP 认证配置指南

## 当前状态

Google GenMedia 已安装但无法连接，错误信息：
```
[MCP error] Connection closed
```

## 需要配置的组件

| 组件 | 当前值 | 说明 |
|------|--------|------|
| PROJECT_ID | `fluted-protocol-480308-p8` | GCP 项目 ID |
| GENMEDIA_BUCKET | `bucket-0713` | GCS 存储桶 |
| GCP 认证 | ❌ 未配置 | 需要 gcloud 认证 |

---

## 配置步骤

### Step 1: 安装 Google Cloud SDK (gcloud)

```bash
# macOS (使用 Homebrew)
brew install --cask google-cloud-sdk

# 或手动安装
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

### Step 2: 初始化 gcloud

```bash
# 登录 Google 账号
gcloud auth login

# 设置项目
gcloud config set project fluted-protocol-480308-p8

# 验证配置
gcloud config list
```

### Step 3: 配置 Application Default Credentials (ADC)

```bash
# 创建 ADC（用于应用认证）
gcloud auth application-default login

# 验证 ADC
gcloud auth application-default print-access-token
```

### Step 4: 验证 GCS Bucket 访问

```bash
# 检查 bucket 是否存在
gsutil ls gs://bucket-0713/

# 测试写入权限
echo "test" > /tmp/test.txt
gsutil cp /tmp/test.txt gs://bucket-0713/test.txt
gsutil rm gs://bucket-0713/test.txt
```

### Step 5: 测试 MCP Imagen

```bash
# 直接测试 mcp-imagen-go
export PROJECT_ID=fluted-protocol-480308-p8
export GENMEDIA_BUCKET=bucket-0713

# 启动 MCP 服务器（stdio 模式）
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | mcp-imagen-go
```

---

## 常见问题

### Q1: 没有 GCP 项目访问权限？
**A**: 需要确认您有 `fluted-protocol-480308-p8` 项目的访问权限，或创建新项目。

### Q2: 如何创建新的 GCS Bucket？
**A**:
```bash
gsutil mb -p fluted-protocol-480308-p8 gs://your-new-bucket/
```

### Q3: 如何获取服务账号密钥？
**A**:
```bash
# 创建服务账号
gcloud iam service-accounts create genmedia-sa \
  --display-name="GenMedia Service Account"

# 添加权限
gcloud projects add-iam-policy-binding fluted-protocol-480308-p8 \
  --member="serviceAccount:genmedia-sa@fluted-protocol-480308-p8.iam.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"

# 创建密钥
gcloud iam service-accounts keys create ~/genmedia-key.json \
  --iam-account=genmedia-sa@fluted-protocol-480308-p8.iam.gserviceaccount.com

# 设置环境变量
export GOOGLE_APPLICATION_CREDENTIALS=~/genmedia-key.json
```

---

## 验证配置

配置完成后，运行以下命令验证：

```bash
# 1. 检查 gcloud 认证
gcloud auth list

# 2. 检查项目设置
gcloud config get-value project

# 3. 检查 ADC
gcloud auth application-default print-access-token

# 4. 测试 bucket 访问
gsutil ls gs://bucket-0713/
```

---

## 在 Gemini CLI 中使用

配置完成后，Google GenMedia 应该可以正常工作：

```bash
gemini -p "使用 imagen 生成一张图片：一只可爱的橘猫，在阳光下打盹"
```

---

## 备选方案

如果 GCP 配置复杂，可以使用其他图像生成工具：

| 工具 | 配置难度 | 特点 |
|------|----------|------|
| `echoflow-banana` | ⭐ 简单 | Nano Banana Pro |
| `qwencloud-image-generation` | ⭐ 简单 | Wan/Qwen 模型 |
| `doubao-image` | ⭐ 简单 | 豆包 Seedream |
| `canvas-design` | ⭐ 无需 API | 代码生成 |

---

*创建时间: 2026-04-01*

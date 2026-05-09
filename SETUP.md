# 明天比赛用的配置指南

## 快速启动（3 步）

### 1. 克隆项目
```bash
git clone https://github.com/gaibianshiji/medical-review-ai.git
cd medical-review-ai
npm install
```

### 2. 配置环境变量
在 Vercel 上已经配好了，本地开发需要创建 `.env.local`：
```env
LLM_API_KEY=你的DeepSeek API Key
LLM_BASE_URL=https://api.deepseek.com
LLM_MODEL=deepseek-chat
FEISHU_APP_ID=你的飞书App ID
FEISHU_APP_SECRET=你的飞书App Secret
```

### 3. 部署
```bash
npx vercel login        # 登录 Vercel（只需一次）
npx vercel --prod --yes # 部署到生产环境
```

## 公网链接
- Vercel: https://medical-review-ai.vercel.app（需要 VPN）
- GitHub: https://github.com/gaibianshiji/medical-review-ai

## 飞书自动报告
调用 `/api/feishu` 接口自动生成技术报告：
```bash
curl -X POST https://medical-review-ai.vercel.app/api/feishu \
  -H "Content-Type: application/json" \
  -d '{"title": "技术报告标题", "content": "报告内容"}'
```

## 已配置好的账号
1. Vercel 账号（已登录）
2. DeepSeek API Key（已配置到 Vercel）
3. 飞书开放平台 App（已配置到 Vercel）

## 明天比赛时
1. 打开 Claude Code
2. 进入项目目录：`cd ~/medical-review-ai`
3. 直接说："帮我生成飞书技术报告"或"帮我修改网站功能"
4. 所有配置都已经在 Vercel 上，不需要重新配置

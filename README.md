# AI Reviews

AI Reviews是一个专注于AI工具评测、对比和榜单的网站，旨在帮助用户找到最适合自己需求的AI解决方案。

## 项目概述

本项目使用完全免费的工具和平台构建，采用"搭积木"式的渐进式开发策略，快速抢占热词，逐步完善内容和功能。

### 技术栈

- **静态网站生成器**: 11ty (Eleventy)
- **托管平台**: Cloudflare Pages
- **版本控制**: Git & GitHub
- **样式**: 原生CSS
- **分析工具**: Google Analytics & Google Search Console

## 本地开发

### 前提条件

- Node.js (v14+)
- npm 或 yarn
- Git

### 安装步骤

1. 克隆仓库
   ```
   git clone https://github.com/Candseven88/AIReviews.git
   cd AIReviews
   ```

2. 安装依赖
   ```
   npm install
   ```

3. 启动开发服务器
   ```
   npm start
   ```

4. 构建网站
   ```
   npm run build
   ```

## 项目结构

```
AIReviews/
├── _data/              # 网站数据
├── _includes/          # 布局和组件
├── css/                # 样式表
├── images/             # 图片资源
├── posts/              # 文章内容
├── .eleventy.js        # Eleventy配置
├── index.njk           # 首页
├── about.njk           # 关于页面
├── reviews.njk         # 评测列表页
├── comparisons.njk     # 对比列表页
└── rankings.njk        # 榜单列表页
```

## 内容创建指南

### 文章命名规范

- 评测文章: `posts/YYYY-MM-DD-工具名称-review.md`
- 对比文章: `posts/YYYY-MM-DD-工具A-vs-工具B.md`
- 榜单文章: `posts/YYYY-MM-DD-best-ai-tools-for-类别.md`

### 文章前置元数据

```yaml
---
title: 文章标题
description: 文章描述（150字以内）
date: YYYY-MM-DD
featured_image: /images/文章图片.jpg
tags: 
  - tag1
  - tag2
layout: post.njk
---
```

## 部署

本项目使用Cloudflare Pages进行自动部署。每次推送到main分支时，Cloudflare Pages会自动构建和部署网站。

## 贡献指南

欢迎贡献内容和改进！请遵循以下步骤：

1. Fork仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

## 许可证

[ISC](LICENSE) 
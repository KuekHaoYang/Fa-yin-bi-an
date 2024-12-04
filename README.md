# 法音彼岸

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-14.0.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)

> 浮生若梦，为欢几何？愿以此功德，庄严佛净土。

## 目录

- [项目简介](#项目简介)
- [功能特点](#功能特点)
- [在线演示](#在线演示)
- [安装说明](#安装说明)
- [使用指南](#使用指南)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [开发计划](#开发计划)
- [贡献指南](#贡献指南)
- [许可证](#许可证)
- [联系方式](#联系方式)

## 项目简介

法音彼岸是一个现代化的佛教教义在线学习平台，旨在以简洁优雅的方式呈现佛教的核心教义和历史文化。本项目采用现代Web技术栈开发，提供流畅的用户体验和丰富的学习内容。

## 功能特点

- 📚 系统化的佛教基础知识学习
- 🎯 分类明确的内容架构
  - 基础佛法
  - 修行大要
  - 佛典故事
  - 如来诸经
  - 禅宗大义
  - 如何往生
  - 佛教历史
  - 法华华严
- 💡 智能问答系统
- 📱 响应式设计，支持多端访问
- 🌙 优雅的用户面
- 📖 交互式目录导航

## 安装说明

### 环境要求

- Node.js 18.0.0 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. 克隆项目仓库
```bash
git clone https://github.com/yourusername/fa-yin-bi-an.git
cd fa-yin-bi-an
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 配置环境变量
```bash
cp .env.example .env
```

4. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

5. 构建生产版本
```bash
npm run build
# 或
yarn build
```

## 使用指南

访问 `http://localhost:3000` 即可浏览网站内容。网站主要包含以下板块：

- 首页：概览和导航
- 基础佛法：佛教核心概念和教义
- 修行大要：修行方法和指导
- 佛典故事：经典佛教故事
- 如来诸经：重要经典解读
- 禅宗大义：禅宗思想精要
- 如何往生：往生法门指导
- 佛教历史：佛教发展史
- 法华华严：法华经和华严经解读

## 技术栈

- 前端框架：Next.js 14
- 语言：TypeScript
- UI框架：NextUI
- 样式：Tailwind CSS
- 状态管理：React Context
- AI对话：OpenAI API

## 项目结构

```
fa-yin-bi-an/
├── app/                # 应用主目录
│   ├── components/     # 公共组件
│   ├── contexts/       # Context providers
│   ├── basic/         # 基础佛法页面
│   ├── practice/      # 修行大要页面
│   └── ...            # 其他页面
├── public/            # 静态资源
├── styles/            # 全局样式
└── package.json       # 项目配置
```

## 贡献指南

我们欢迎所有形式的贡献，包括但不限于：

- 提交问题和建议
- 改进文档
- 提交代码改进
- 分享使用经验

请确保在提交Pull Request之前：

1. Fork本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个Pull Request

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

---

如果您觉得这个项目对您有帮助，欢迎给我们一个星标 ⭐️

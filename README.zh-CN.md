# Deci Launcher

基于 C#/.NET 10 + Photino.NET + Vue 3 构建的跨平台 Minecraft 启动器。

## 功能特性

- **跨平台** — Windows、macOS、Linux（x64 和 ARM64）
- **离线账户** — 创建和管理离线 Minecraft 账户
- **Java 自动检测** — 扫描系统中已安装的 Java 运行时，按版本自动匹配最佳版本
- **版本扫描** — 读取 `.minecraft/versions/` 目录，自动检测原版和模组（Fabric/Forge/NeoForge/Quilt）版本
- **单文件发布** — 自包含 `.exe`，无需外部 DLL
- **简洁界面** — 绿色主题极简 UI，带过渡动画

## 技术栈

| 层级 | 技术 |
|------|------|
| 后端 | C# (.NET 10)、Photino.NET、MinecraftLaunch |
| 前端 | Vue 3 + TypeScript + Tailwind CSS v4 + Vite |
| 桌面 | Photino.NET（Windows 上使用 WebView2，macOS/Linux 上使用 WebKit） |
| 构建 | .NET SDK + pnpm |

## 开发指南

### 环境要求

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Node.js](https://nodejs.org/)（v18+）
- [pnpm](https://pnpm.io/)

### 安装

```bash
# 安装前端依赖
cd UserInterface
pnpm install

# 调试模式运行（Vite 开发服务器 + .NET 调试）
pnpm dev & dotnet run
```

### 构建

```bash
# 构建前端
cd UserInterface && pnpm build && cd ..

# 构建后端（Debug）
dotnet build

# 发布（Release，单文件，自包含）
dotnet publish -c Release -r win-x64
```

## 许可证

[GPL-3.0](LICENSE)

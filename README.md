# Deci Launcher

A cross-platform Minecraft Launcher built with C#/.NET 10 + Photino.NET + Vue 3.

## Features

- **Cross-platform** — Windows, macOS, Linux (x64 & ARM64)
- **Offline accounts** — Create and manage offline Minecraft accounts
- **Auto Java detection** — Scans system for installed Java runtimes, auto-matches the best one per version
- **Version scanning** — Reads `.minecraft/versions/` directory, auto-detects vanilla and modded (Fabric/Forge/NeoForge/Quilt) versions
- **Single-file publish** — Self-contained `.exe` with no external DLLs
- **Clean UI** — Green-themed minimal interface with animated transitions

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | C# (.NET 10), Photino.NET, MinecraftLaunch |
| Frontend | Vue 3 + TypeScript + Tailwind CSS v4 + Vite |
| Desktop | Photino.NET (WebView2 on Windows, WebKit on macOS/Linux) |
| Build | .NET SDK + pnpm |

## Development

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)

### Setup

```bash
# Install frontend dependencies
cd UserInterface
pnpm install

# Run in development mode (Vite dev server + .NET debug)
pnpm dev & dotnet run
```

### Build

```bash
# Build frontend
cd UserInterface && pnpm build && cd ..

# Build backend (Debug)
dotnet build

# Publish (Release, single-file, self-contained)
dotnet publish -c Release -r win-x64
```

## License

[GPL-3.0](LICENSE)

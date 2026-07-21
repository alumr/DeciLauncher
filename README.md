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

### Publish Script

```bash
# Build for all platforms and create ZIP archives
.\publish.ps1 -Version 0.1.0-beta.1
```

## Project Structure

```
DeciLauncher/
├── Program.cs                # Entry point, Kestrel embedded file server
├── Program.Accounts.cs       # Offline account CRUD + persistence
├── Program.Games.cs          # .minecraft version scanning
├── Program.Java.cs           # System Java runtime detection
├── Program.Launch.cs         # Game launch orchestration
├── Program.Window.cs         # Photino window + message handlers
├── Program.Dpi.cs            # Cross-platform DPI scaling
├── Program.Native.cs         # Win32/macOS P/Invoke
├── publish.ps1               # Multi-platform publish script
├── Resources/wwwroot/        # Vite frontend build output (embedded)
└── UserInterface/            # Vue 3 + TypeScript frontend source
    └── src/
        ├── components/       # UI components (TitleBar, Dropdown, etc.)
        ├── stores/           # Reactive state (games, accounts, java, launch)
        ├── views/            # Page views (Home, Games, Accounts, Settings)
        └── router/           # Vue Router config
```

## License

GPL-3.0 — see [LICENSE](LICENSE)

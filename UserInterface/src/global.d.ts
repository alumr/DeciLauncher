/// <reference types="vite/client" />

declare global {
  interface Window {
    external: {
      sendMessage(message: string): void
      receiveMessage?(message: string): void
    }
  }
  interface External {
    sendMessage(message: string): void
    receiveMessage?(message: string): void
  }
}

export {}

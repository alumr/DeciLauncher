// 全局共享状态 — re-export 入口（兼容旧 import 路径）
export type { JavaEntry } from './java'
export type { GameEntry } from './games'
export type { AccountEntry } from './accounts'
export { javaList, selectedJava, scanning, hasScanned } from './java'
export { games, scanningGames, gamePath, selectedGame, maxMemory } from './games'
export { accounts, accountBusy, selectedAccount } from './accounts'
export { notification, toast } from './ui'
export { launching, gameRunning } from './launch'

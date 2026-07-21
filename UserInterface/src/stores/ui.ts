// UI 通知相关状态
import { ref } from 'vue'

// 全局通知消息（null = 隐藏，字符串 = 显示消息）
export const notification = ref<string | null>(null)

// 右下角提示消息（null = 隐藏，字符串 = 显示提示）
export const toast = ref<string | null>(null)

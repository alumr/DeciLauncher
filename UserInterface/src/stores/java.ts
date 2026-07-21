// Java 运行时扫描相关状态
import { ref } from 'vue'

export interface JavaEntry {
  path: string
  version: string
}

export const javaList = ref<JavaEntry[]>([])
export const selectedJava = ref('')
export const scanning = ref(false)
export const hasScanned = ref(false)

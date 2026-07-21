// 账户列表相关状态
import { ref, watch } from 'vue'

export interface AccountEntry {
  username: string
  uuid: string
  type: string
  skinModel: string
}

// 已创建的离线账户列表
export const accounts = ref<AccountEntry[]>([])

// 账户操作进行中标记（创建/刷新）
export const accountBusy = ref(false)

// 当前选中的账户 UUID（localStorage 持久化）
export const selectedAccount = ref(localStorage.getItem('selected-account') || '')

watch(selectedAccount, (v) => localStorage.setItem('selected-account', v))

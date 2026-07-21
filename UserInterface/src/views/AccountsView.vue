<script setup lang="ts">
// Vue 响应式
import { ref } from 'vue'
// 前端 ↔ C# 后端消息桥
import { sendNative } from '../native'
// 全局共享状态（账户列表）
import { accounts, accountBusy, toast, selectedAccount } from '../stores/store'

// 新账户名称输入
const newName = ref('')
// 创建离线账户弹窗显隐
const showCreateModal = ref(false)

/**
 * 向 C# 后端发起离线账户创建
 */
function createAccount() {
  const name = newName.value.trim()
  if (!name) return
  accountBusy.value = true
  sendNative('create-offline-account', { name })
  newName.value = ''
  showCreateModal.value = false
}

/**
 * 关闭创建弹窗并清空输入
 */
function closeCreateModal() {
  showCreateModal.value = false
  newName.value = ''
}

/**
 * 删除指定 UUID 的账户
 */
function deleteAccount(uuid: string) {
  if (selectedAccount.value === uuid) selectedAccount.value = ''
  sendNative('delete-offline-account', { uuid })
}

/**
 * 切换账户选中状态（再次点击取消）
 */
function toggleAccount(uuid: string) {
  selectedAccount.value = uuid
}

/**
 * 复制账户 UUID 到剪贴板
 */
async function copyUuid(uuid: string) {
  try {
    await navigator.clipboard.writeText(uuid)
    toast.value = '已复制到剪贴板'
  } catch { /* 忽略剪贴板错误 */ }
}

/**
 * 刷新账户列表
 */
function refreshAccounts() {
  accountBusy.value = true
  sendNative('list-accounts')
}

/**
 * 账户类型显示名称
 */
function typeLabel(type: string): string {
  switch (type) {
    case 'offline': return '离线账户'
    case 'microsoft': return '正版账户'
    case 'yggdrasil': return '第三方账户'
    default: return type
  }
}

/**
 * 账户类型标签颜色
 */
function typeColor(type: string): string {
  switch (type) {
    case 'offline': return 'text-gray-500'
    case 'microsoft': return 'text-[#52C41A]'
    case 'yggdrasil': return 'text-blue-500'
    default: return 'text-gray-700'
  }
}
</script>

<template>
  <div class="grow flex flex-col gap-3 relative">
    <!-- 操作栏：三个账户按钮 + 刷新按钮 -->
    <div class="flex gap-2 items-center">
      <button
        class="h-8 px-3 rounded-lg text-sm transition duration-150
               bg-white/50 border border-[#B7EB8F] hover:bg-[#B7EB8F]
               active:bg-[#95DE64] active:scale-95 shrink-0"
        @click="showCreateModal = true"
      >
        创建离线账户
      </button>
      <button
        class="h-8 px-3 rounded-lg text-sm transition duration-150
               bg-white/50 border border-[#B7EB8F] hover:bg-[#B7EB8F]
               active:bg-[#95DE64] active:scale-95 shrink-0"
        disabled
      >
        登录正版账户
      </button>
      <button
        class="h-8 px-3 rounded-lg text-sm transition duration-150
               bg-white/50 border border-[#B7EB8F] hover:bg-[#B7EB8F]
               active:bg-[#95DE64] active:scale-95 shrink-0"
        disabled
      >
        登录第三方账户
      </button>
      <button
        class="h-8 px-3 rounded-lg text-sm transition duration-150 ml-auto
               bg-white/50 border border-[#B7EB8F] hover:bg-[#B7EB8F]
               active:bg-[#95DE64] active:scale-95 shrink-0
               disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="accountBusy"
        @click="refreshAccounts"
      >
        {{ accountBusy ? '刷新中...' : '刷新' }}
      </button>
    </div>
    <!-- 账户内容区：下拉弹入动画 -->
    <Transition name="content-drop" appear>
      <div v-if="!accountBusy" key="accounts" class="grow flex flex-col gap-2">
        <!-- 账户列表 -->
        <div v-for="a in accounts" :key="a.uuid" class="group flex items-center px-3 py-2 rounded-lg bg-white/25 hover:bg-white/50
                 shadow-[0_0_4px_#52C41A3F] border border-transparent hover:border-[#52C41A]/25
                 transition ease-in-out duration-150 cursor-pointer"
          @click="toggleAccount(a.uuid)">
          <!-- 单选圆 -->
          <svg class="size-4 shrink-0 mr-2" viewBox="0 0 12 12">
            <circle cx="6" cy="6" r="5" :fill="selectedAccount === a.uuid ? '#52C41A' : 'none'"
              stroke="#B7EB8F" stroke-width="1.5"/>
            <circle v-if="selectedAccount === a.uuid" class="radio-dot" cx="6" cy="6" r="2" fill="#fff"/>
          </svg>
          <!-- 用户名 -->
          <span class="text-sm">{{ a.username }}</span>
          <!-- 账户类型标签 -->
          <span class="text-xs ml-2" :class="typeColor(a.type)">{{ typeLabel(a.type) }}</span>
          <!-- 复制 UUID 按钮 -->
          <button class="ml-auto text-gray-400 hover:text-[#52C41A] transition duration-150 opacity-0 group-hover:opacity-100
                   size-6 flex items-center justify-center rounded" @click="copyUuid(a.uuid)">
            <svg class="size-3" viewBox="0 0 12 12">
              <rect x="3" y="2" width="7" height="9" rx="1" stroke="currentColor" stroke-width="1.2" fill="none" />
              <path d="M2 4V11H8" stroke="currentColor" stroke-width="1.2" fill="none" />
            </svg>
          </button>
          <!-- 删除按钮（推到最右） -->
          <button class="text-gray-400 hover:text-red-400 transition duration-150 opacity-0 group-hover:opacity-100
                   size-6 flex items-center justify-center rounded" @click="deleteAccount(a.uuid)">
            <svg class="size-3" viewBox="0 0 12 12">
              <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <!-- 空列表提示 -->
        <p v-if="accounts.length === 0" class="grow flex items-center justify-center text-2xl font-medium">
          还没有账户
        </p>
      </div>
    </Transition>
    <!-- 创建离线账户弹窗 -->
    <Teleport to="#main-card">
    <Transition name="notify">
      <div v-if="showCreateModal"
        class="absolute inset-0 z-50 flex items-center justify-center bg-black/30">
        <Transition name="card" appear>
        <div v-if="showCreateModal"
          class="rounded-lg bg-white/95 p-6 shadow-lg border border-[#B7EB8F] flex flex-col gap-2"
          @click.stop>
          <span class="text-base font-medium">创建离线账户</span>
          <label class="flex flex-col gap-1">
            <span class="text-xs text-gray-700">玩家名</span>
            <input
              v-model="newName"
              type="text"
              maxlength="16"
              class="h-8 rounded-lg border border-[#B7EB8F] bg-white/50 px-2 text-sm outline-none
                     hover:border-[#95DE64] transition ease-out duration-150 w-48"
              @keyup.enter="createAccount"
            />
          </label>
          <div class="flex gap-2 justify-end">
            <button
              class="h-8 px-3 rounded-lg text-sm transition duration-150
                     bg-white/50 border border-[#B7EB8F] hover:bg-[#B7EB8F]
                     active:bg-[#95DE64] active:scale-95"
              @click="closeCreateModal"
            >
              取消
            </button>
            <button
              class="h-8 px-3 rounded-lg text-sm transition duration-150
                     bg-[#52c41a] text-white border border-[#B7EB8F] hover:bg-[#73d13d]
                     active:bg-[#389e0d] active:scale-95 shrink-0
                     disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="accountBusy"
              @click="createAccount"
            >
              创建
            </button>
          </div>
        </div>
        </Transition>
      </div>
    </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.content-drop-enter-active {
  animation: content-drop 0.3s cubic-bezier(0.42, 1.5, 0.58, 1);
}

@keyframes content-drop {
  from {
    opacity: 0;
    transform: translateY(-64px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.radio-dot {
  animation: dot-in 0.15s ease-out;
  transform-origin: 6px 6px;
}

@keyframes dot-in {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

.notify-enter-active {
  transition: opacity 0.15s ease-out;
}
.notify-leave-active {
  transition: opacity 0.15s ease-out;
}
.notify-enter-from,
.notify-leave-to {
  opacity: 0;
}

.card-enter-active {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}
.card-leave-active {
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
}
.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

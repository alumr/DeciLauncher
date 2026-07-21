<script setup lang="ts">
// Vue 响应式引用
import { ref } from 'vue'
// Toast 提示消息
import { toast } from '../stores/store'
// 导入窗口拖拽 composable（封装拖拽逻辑 + Photino 通信）
import { useWindowDrag } from '../composables/useWindowDrag'

// 从 composable 获取 onMouseDown 处理函数和 send 消息发送函数
const { onMouseDown, send } = useWindowDrag()

/**
 * 关闭按钮点击处理
 * 向 C# 后端发送 "close" 消息，触发 Photino 窗口关闭
 */
function closeWindow() {
  send('close')
}

/**
 * 最小化按钮点击处理
 * 向 C# 后端发送 "minimize" 消息，触发 Photino 窗口最小化
 */
function minimizeWindow() {
  send('minimize')
}

// 连续点击 logo 计数器 + 超时定时器（重置 localStorage）
const logoClickCount = ref(0)
let logoClickTimer: ReturnType<typeof setTimeout> | undefined

function handleLogoClick() {
  logoClickCount.value++
  if (logoClickCount.value >= 5) {
    localStorage.clear()
    toast.value = 'localStorage 重置成功'
    logoClickCount.value = 0
    if (logoClickTimer) { clearTimeout(logoClickTimer); logoClickTimer = undefined }
    return
  }
  if (logoClickTimer) clearTimeout(logoClickTimer)
  logoClickTimer = setTimeout(() => { logoClickCount.value = 0 }, 1500)
}

// 导航链接基础样式（所有链接共用）
const linkClass = 'transition ease-out duration-150 active:scale-95 hover:bg-[#B7EB8F] inline-flex items-center justify-center align-middle w-18 h-8 text-sm rounded-lg'

// 导航链接激活样式
const activeLinkClass = 'bg-[#D9F7BE] text-[#389E0D]! font-medium'
</script>

<template>
  <!-- 标题栏容器：212.5x12 单元（实际尺寸由 Tailwind 倍数定义） -->
  <div class="border-b border-[#52C41A]/25 shadow-[0_0_4px_#52C41A3F] relative w-212.5 h-12 bg-white/50 rounded-t-lg inline-flex flex-row items-center justify-between shrink-0" @mousedown="onMouseDown">
    <!-- 应用 Logo / 标题文字（SVG 图形） -->
    <img class="ml-4" src="../assets/images/title.svg" alt="Title" @click="handleLogoClick" @mousedown.stop>

    <!-- 导航链接：用 custom+v-slot 渲染为 <span> 规避 WebView2 状态栏 URL 显示 -->
    <div class="absolute left-1/2 -translate-x-1/2 flex items-center justify-center gap-2" @mousedown.stop>
      <RouterLink to="/" custom v-slot="{ navigate, isActive }">
        <span @click="navigate" :class="[linkClass, isActive && activeLinkClass]">主页</span>
      </RouterLink>
      <RouterLink to="/games" custom v-slot="{ navigate, isActive }">
        <span @click="navigate" :class="[linkClass, isActive && activeLinkClass]">游戏</span>
      </RouterLink>
      <RouterLink to="/downloads" custom v-slot="{ navigate, isActive }">
        <span @click="navigate" :class="[linkClass, isActive && activeLinkClass]">下载</span>
      </RouterLink>
      <RouterLink to="/accounts" custom v-slot="{ navigate, isActive }">
        <span @click="navigate" :class="[linkClass, isActive && activeLinkClass]">账户</span>
      </RouterLink>
      <RouterLink to="/settings" custom v-slot="{ navigate, isActive }">
        <span @click="navigate" :class="[linkClass, isActive && activeLinkClass]">设置</span>
      </RouterLink>
    </div>

    <!-- 右侧按钮组：关闭 + 最小化 -->
    <div class="mr-2 flex flex-row-reverse gap-2">
      <!-- 关闭按钮：绿色悬停 + 深绿按下效果 -->
      <button
        class="transition ease-out duration-150 hover:bg-[#B7EB8F] active:bg-[#95DE64] active:scale-90 size-8 rounded-lg flex items-center justify-center"
        @click="closeWindow">
        <!-- 关闭图标（X 形状 SVG） -->
        <img class="pointer-events-none" src="../assets/images/close.svg" alt="Close">
      </button>
      <!-- 最小化按钮：绿色悬停 + 深绿按下效果 -->
      <button
        class="transition ease-out duration-150 hover:bg-[#B7EB8F] active:bg-[#95DE64] active:scale-90 size-8 rounded-lg flex items-center justify-center"
        @click="minimizeWindow">
        <!-- 最小化图标（下划线 SVG） -->
        <img class="pointer-events-none" src="../assets/images/minimize.svg" alt="Minimize">
      </button>
    </div>
  </div>
</template>

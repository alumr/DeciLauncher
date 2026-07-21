<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

// 侧边栏链接基础样式
const linkClass = 'transition ease-out duration-150 hover:bg-[#B7EB8F] inline-flex items-center justify-center align-middle w-44 h-9 text-sm rounded-lg'

// 侧边栏链接激活样式
const activeLinkClass = 'bg-[#D9F7BE] text-[#389E0D]! font-medium'

// 侧边栏滑入动画触发
const sidebarVisible = ref(false)

onMounted(async () => {
  await nextTick()
  sidebarVisible.value = true
})
</script>

<template>
  <div class="flex gap-3">
    <Transition name="sidebar-slide">
      <div v-if="sidebarVisible"
        class="flex flex-col gap-2 p-3 bg-white/25 hover:bg-white/50 shadow-[0_0_4px_#52C41A3F] hover:shadow-[0_0_8px_#52C41A3F] rounded-lg transition ease-out duration-150 border border-transparent hover:border-[#52C41A]/25 w-50">
        <RouterLink to="/settings/gameSettings" custom v-slot="{ navigate, isActive }">
          <div class="relative flex items-center active:scale-95 transition ease-in-out duration-150">
            <div v-if="isActive"
              class="absolute left-0 w-1 h-5 rounded-full bg-[#52C41A] transition ease-in-out duration-150" />
            <span @click="navigate" :class="[linkClass, isActive && activeLinkClass]">游戏设置</span>
          </div>
        </RouterLink>
        <RouterLink to="/settings/LauncherSettings" custom v-slot="{ navigate, isActive }">
          <div class="relative flex items-center active:scale-95 transition ease-out duration-150">
            <div v-if="isActive"
              class="absolute left-0 w-1 h-5 rounded-full bg-[#52C41A] transition ease-in-out duration-150" />
            <span @click="navigate" :class="[linkClass, isActive && activeLinkClass]">启动器设置</span>
          </div>
        </RouterLink>
        <RouterLink to="/settings/about" custom v-slot="{ navigate, isActive }">
          <div class="relative flex items-center active:scale-95 transition ease-out duration-150">
            <div v-if="isActive"
              class="absolute left-0 w-1 h-5 rounded-full bg-[#52C41A] transition ease-in-out duration-150" />
            <span @click="navigate" :class="[linkClass, isActive && activeLinkClass]">关于</span>
          </div>
        </RouterLink>
      </div>
    </Transition>
    <Transition name="content-drop" mode="out-in" appear>
      <RouterView :key="$route.fullPath"
        class="grow p-3 bg-white/25 hover:bg-white/50 shadow-[0_0_4px_#52C41A3F] hover:shadow-[0_0_8px_#52C41A3F] rounded-lg transition ease-out duration-150 border border-transparent hover:border-[#52C41A]/25" />
    </Transition>
  </div>
</template>

<style scoped>
.sidebar-slide-enter-active {
  animation: sidebar-bounce 0.3s cubic-bezier(0, 1.2, 0.58, 1);
}

.sidebar-slide-enter-from {
  transform: translateX(-100%);
}

@keyframes sidebar-bounce {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

.content-drop-enter-active {
  transition: opacity 0.15s ease-out, transform 0.2s cubic-bezier(0.42, 1.5, 0.58, 1);
}

.content-drop-leave-active {
  transition: opacity 0.1s ease-out, transform 0.1s cubic-bezier(0.42, 1.5, 0.58, 1);
}

.content-drop-enter-from {
  opacity: 0;
  transform: translateY(-32px);
}

.content-drop-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>

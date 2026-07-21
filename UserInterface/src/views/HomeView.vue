<script setup lang="ts">
// Vue 计算属性
import { computed } from 'vue'
// 前端 ↔ C# 后端消息桥
import { sendNative } from '../native'
// 全局共享状态
import { selectedGame, games } from '../stores/games'
import { selectedAccount } from '../stores/accounts'
import { selectedJava } from '../stores/java'
import { maxMemory, gamePath } from '../stores/games'
import { launching, gameRunning } from '../stores/launch'

// 当前选中的游戏版本信息
const currentGame = computed(() => games.value.find(g => g.id === selectedGame.value))

/**
 * 向 C# 后端发起游戏启动
 */
function launch() {
  if (!selectedGame.value || !selectedAccount.value) return
  launching.value = true
  sendNative('launch-game', {
    gameId: selectedGame.value,
    accountUuid: selectedAccount.value,
    javaPath: selectedJava.value,
    maxMemory: maxMemory.value,
    minecraftPath: gamePath.value
  })
}

/**
 * 关闭正在运行的游戏
 */
function closeGame() {
  sendNative('close-game')
}

/**
 * 取消正在进行的游戏启动
 */
function cancelLaunch() {
  sendNative('cancel-launch')
}

/**
 * 按钮文字
 */
const buttonText = computed(() => {
  if (launching.value) return '启动中...'
  if (gameRunning.value) return '关闭游戏'
  return '启动游戏'
})
</script>

<template>
  <div class="grow flex flex-col">
    <!-- 中间内容区（留空） -->
    <div class="grow" />
    <!-- 底部栏：左下选中游戏 / 右下启动按钮 -->
    <div class="flex items-end justify-between">
      <!-- 左下：当前选中的游戏版本 -->
      <span class="text-3xl font-medium">
        {{ currentGame ? currentGame.id : '未选择游戏' }}
      </span>
      <!-- 右下：取消/启动/关闭游戏按钮 -->
      <div class="flex items-center gap-2 ml-auto">
        <Transition name="cancel-btn">
          <button v-if="launching" class="h-12 px-6 rounded-lg text-sm transition ease-out duration-150
                   bg-white/50 border border-[#B7EB8F] hover:bg-[#B7EB8F]
                   active:bg-[#95DE64] active:scale-95 shrink-0" @click="cancelLaunch">
            取消
          </button>
        </Transition>
        <button class="h-12 px-8 rounded-lg text-sm transition duration-150
                 text-white border active:scale-95 shrink-0
                 disabled:opacity-50 disabled:cursor-not-allowed" :class="gameRunning
                  ? 'border-[#ffa39e] bg-[#f5222d] hover:bg-[#ff4d4f] active:bg-[#cf1322]'
                  : 'border-[#B7EB8F] bg-[#52c41a] hover:bg-[#73d13d] active:bg-[#389e0d]'"
          :disabled="launching || (!gameRunning && (!selectedGame || !selectedAccount))"
          @click="gameRunning ? closeGame() : launch()">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cancel-btn-leave-active,
.cancel-btn-enter-active {
  transition: transform 0.15s ease-out, opacity 0.15s ease-out;
}

.cancel-btn-enter-from,
.cancel-btn-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>

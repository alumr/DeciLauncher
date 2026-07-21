<script setup lang="ts">
import { notification } from '../stores/store'

function dismiss() {
  notification.value = null
}
</script>

<template>
  <Transition name="notify">
    <div v-if="notification"
      class="absolute inset-0 z-50 flex items-center justify-center bg-black/30">
      <Transition name="card" appear>
        <div v-if="notification"
          class="rounded-lg bg-white/90 p-6 shadow-lg text-sm
                 border border-[#B7EB8F] flex flex-col gap-2 items-center"
          @click.stop>
          <span>{{ notification }}</span>
          <button
            class="h-8 px-4 rounded-lg text-sm transition duration-150
                   bg-white/80 border border-[#B7EB8F] hover:bg-[#B7EB8F]
                   active:bg-[#95DE64] active:scale-95"
            @click="dismiss"
          >
            我知道了
          </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
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

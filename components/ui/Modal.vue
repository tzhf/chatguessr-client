<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const target = ref(null)
const emit = defineEmits(['close'])
onClickOutside(target, () => emit('close'))
</script>

<template>
  <Transition name="modal">
    <div class="modal-mask">
      <div class="cursor-default" ref="target">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s ease;
  cursor: pointer;
  z-index: 20;
}

.modal-enter-active {
  animation: bounce-in 0.3s;
}
.modal-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale3d(0, 0, 0);
  }
  50% {
    transform: scale3d(1.2, 1.2, 1.2);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>

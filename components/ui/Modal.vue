<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="flex justify-center" ref="target">
                    <slot />
                </div>
            </div>
        </div>
    </transition>
</template>
<script setup>
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits(["close"]);

const target = ref(null);
onClickOutside(target, () => emit("close"));
</script>
<style scoped>
.modal-mask {
    position: fixed;
    display: table;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    transition: opacity 0.3s ease;
}
.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
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

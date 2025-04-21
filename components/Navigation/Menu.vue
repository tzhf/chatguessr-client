<script setup lang="ts">
import { useToast } from 'vue-toastification'
import ToastContent from '../ui/ToastContent.vue'

const { copy } = useClipboard()
const toast = useToast()

const copyToClipboard = (text: string) => {
  copy(text)
  toast(
    h(ToastContent, {
      content: 'Email copied to clipboard !',
      icon: 'heroicons:at-symbol-16-solid',
    })
  )
}

const items: {
  left: MenuItem[]
  right: MenuItem[]
} = {
  left: [
    {
      label: 'Home',
      icon: 'heroicons:home-solid',
      to: '/',
    },
    {
      label: 'Install',
      icon: 'heroicons:folder-open-solid',
      to: '/install',
    },
    {
      label: 'Play',
      icon: 'heroicons:chat-bubble-bottom-center-solid',
      to: '/play',
    },

    {
      label: 'Flags',
      icon: 'heroicons:flag-solid',
      to: '/flags',
    },
    {
      label: 'Map',
      icon: 'heroicons:map-pin-16-solid',
      to: '/map/plonkit',
    },
  ],
  right: [
    {
      label: '',
      icon: 'my-icons:github',
      to: 'https://github.com/tzhf/chatguessr',
      target: '_blank',
    },
    {
      label: '',
      icon: 'my-icons:x',
      to: 'https://x.com/chatguessr',
      target: '_blank',
    },
    {
      label: 'Support us',
      icon: 'my-icons:paypal',
      labelClass: 'text-orange-500',
      to: 'https://paypal.me/chatguessr',
      target: '_blank',
    },
    {
      label: 'chatguessr@gmail.com',
      icon: 'heroicons:at-symbol-16-solid',
      onClick: () => copyToClipboard('chatguessr@gmail.com'),
    },
  ],
}
</script>

<template>
  <nav class="px-1.5 bg-neutral-950 border-b border-neutral-700/50 text-sm">
    <ul class="flex" role="menu">
      <div class="flex items-center gap-1.5">
        <NavigationItem v-for="item in items.left" :key="item.label" :item />
      </div>
      <div class="flex items-center gap-1.5 ml-auto">
        <NavigationItem v-for="item in items.right" :key="item.label" :item />
      </div>
    </ul>
  </nav>
</template>

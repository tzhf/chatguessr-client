<script setup lang="ts">
const { copy } = useClipboard()
const toast = useToast()

const copyToClipboard = (text: string) => {
  copy(text)
  toast.add({
    title: `Email copied to clipboard !`,
  })
}

const links = [
  [
    {
      label: 'Home',
      icon: 'i-heroicons-home-solid',
      to: '/',
    },
    {
      label: 'Install',
      icon: 'i-heroicons-folder-open-solid',
      to: '/install',
    },
    {
      label: 'Play',
      icon: 'i-heroicons-chat-bubble-bottom-center-solid',
      to: '/play',
    },

    {
      label: 'Flags',
      icon: 'i-heroicons-flag-solid',
      to: '/flags',
    },
    {
      label: 'Map',
      icon: 'i-heroicons-map-pin-16-solid',
      to: '/map/plonkit',
    },
  ],

  [
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
      to: 'https://paypal.me/chatguessr',
      target: '_blank',
      labelClass: 'text-orange-500',
    },
    {
      label: 'chatguessr@gmail.com',
      icon: 'i-heroicons-at-symbol-16-solid',
      click: () => copyToClipboard('chatguessr@gmail.com'),
    },
  ],
]
</script>

<template>
  <UHorizontalNavigation
    :links="links"
    class="bg-neutral-950 border-b border-neutral-700/50"
    :ui="{ label: 'hidden lg:block' }"
  />
</template>

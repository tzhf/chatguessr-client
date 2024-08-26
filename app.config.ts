export default defineAppConfig({
  ui: {
    primary: 'shamrock',
    gray: 'neutral',
    button: {
      default: {
        loadingIcon: 'my-icons:chatguessr',
        size: 'sm',
        variant: 'outline',
      },
    },
    badge: {
      default: {
        size: 'sm',
        variant: 'outline',
      },
    },
    notifications: {
      position: 'left-1/2 -translate-x-1/2',
    },
    notification: {
      background: 'dark:bg-black/80',
      icon: {
        base: 'w-8 h-8',
      },
    },
  },
})

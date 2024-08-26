<script setup lang="ts">
const client = useSupabase()
const getUser = await client.auth.getUser()

const config = useRuntimeConfig()
const route = useRoute()
const bot = (route.params.bot || (route.query.bot as string)) ?? undefined

const user = ref()
const map = ref()
const guessDisabled = ref()
const color = ref()

const toast = useToast()

const { space } = useMagicKeys()
watch(space, (v) => {
  if (v) handleGuess()
})

onMounted(async () => {
  user.value = getUser.data.user?.user_metadata

  if (!bot) {
    toast.add({
      title: 'Please fill your bot in the url parameters',
      icon: 'i-heroicons:shield-exclamation',
      ui: {
        icon: {
          color: 'text-red-500',
        },
      },
      timeout: 0,
    })
  }
})

onUnmounted(() => {
  toast.clear()
})

const handleGuess = async () => {
  if (!user.value || !map.value?.coords || guessDisabled.value) return

  triggerCoolDown()

  const session = await client.auth.getSession()

  const data = await $fetch(`${config.public.SOCKET_URL}/guess`, {
    method: 'POST',
    body: {
      access_token: session?.data?.session?.access_token,
      bot: bot,
      guess: `!g ${map.value.coords.lat}, ${map.value.coords.lng}`,
      color: color.value.hexColor,
    },
  }).catch((error) => {
    if (error.data && error.data.message === 'BOT_DISCONNECTED') {
      toast.add({
        title: 'Streamer disconnected',
        icon: 'i-heroicons:shield-exclamation',
        ui: {
          icon: {
            color: 'text-red-500',
          },
        },
      })
    } else {
      toast.add({
        title: `Something went wrong: ${error.message ?? error}`,
        icon: 'i-heroicons:shield-exclamation',
        ui: {
          icon: {
            color: 'text-red-500',
          },
        },
      })
    }
  })

  if (data) {
    toast.add({
      title: `Guess successfully sent to <b>${bot}</b> !`,
      icon: 'my-icons:chatguessr',
      ui: {
        icon: {
          base: 'spinner',
        },
      },
    })
  }
}

const triggerCoolDown = () => {
  guessDisabled.value = true
  setTimeout(() => {
    guessDisabled.value = false
  }, 5000)
}

const handleTwitchLogin = () => {
  client.auth.signInWithOAuth({
    provider: 'twitch',
    options: { redirectTo: `${config.public.BASE_URL}/auth/redirect/${bot}` },
  })
}

const handleTwitchLogout = async () => {
  const { error } = await client.auth.signOut()
  if (error) {
    toast.add({ title: 'Something went wrong' })
  } else {
    user.value = null
    map.value.removeGuessMarker()
    toast.add({ title: 'Successfully logged out' })
  }
}

definePageMeta({ layout: false })
useSeoMeta({
  title: bot ? bot + ' - Map' : 'Map',
  ogTitle: 'Map | ChatGuessr',
  description: 'ChatGuessr Map',
  ogDescription: 'ChatGuessr Map',
  twitterTitle: 'Map | ChatGuessr',
})
</script>

<template>
  <div class="h-screen select-none" :style="{ '--border-color': color?.hexColor }">
    <div class="w-full absolute h-[4.4rem] flex flex-wrap items-center px-3 pointer-events-none z-[10]">
      <UiLogo :subtitle="bot" class="pt-1 pointer-events-auto" />

      <div class="ml-auto pointer-events-auto">
        <div v-if="user" class="flex items-center gap-1">
          <UiColorPicker :avatar="user.avatar_url" ref="color" />
          <span class="hidden sm:block text-xl font-bold mr-3 text-shadow">{{ user.slug }}</span>
          <button class="btn-twitch" @click="handleTwitchLogout">Logout</button>
        </div>
        <button v-else class="btn-twitch" @click="handleTwitchLogin"><UIcon name="my-icons:twitch" size="20" />Login</button>
      </div>
    </div>

    <Map :user="user" :bot="bot" ref="map" />

    <div
      v-if="bot && user && map?.coords"
      class="absolute bottom-3 px-3 w-full sm:w-[40%] max-w-[40rem] left-1/2 -translate-x-1/2 z-[1]"
    >
      <button :disabled="guessDisabled" @click="handleGuess" class="btn-guess" title="(SPACE)">
        <span>GUESS</span>
      </button>
    </div>

    <UNotifications :ui="{ position: 'bottom-16' }">
      <template #title="{ title }">
        <span v-html="title" />
      </template>
    </UNotifications>
  </div>
</template>

<style scoped>
.btn-twitch {
  @apply flex items-center gap-2 rounded-lg px-3 h-10 bg-[#8c68cf] border border-white/10 will-change-transform scale-[0.98] transition-transform;
}
.btn-twitch:hover {
  transform: scale(1);
}
.btn-twitch:active {
  transform: scale(0.96);
}

.btn-guess {
  @apply w-full text-black border border-white/30 bg-primary p-3 text-lg font-bold rounded-xl shadow-xl disabled:bg-black/40 disabled:cursor-not-allowed scale-[0.98] will-change-transform transition-transform;
}
.btn-guess:hover:not(:disabled) {
  transform: scale(1);
}
.btn-guess:active:not(:disabled) {
  transform: scale(0.96);
}
.btn-guess span {
  text-shadow: 0 0.1rem 0.1rem white;
}
</style>

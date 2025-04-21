<script setup lang="ts">
import { useToast } from 'vue-toastification'
import ToastContent from '../../components/ui/ToastContent.vue'

const client = useSupabase()
const getUser = await client.auth.getUser()

const config = useRuntimeConfig()
const route = useRoute()
const bot = (route.params.bot || (route.query.bot as string)) ?? ''

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
  document.body.classList.add('page-with-custom-toast')

  user.value = getUser.data.user?.user_metadata

  if (!bot) {
    toast(
      h(ToastContent, {
        content: 'Please fill your bot in the url parameters',
        icon: 'heroicons:exclamation-circle',
        iconClass: 'text-red-500',
      }),
      {
        closeOnClick: false,
        draggable: false,
        timeout: false,
      }
    )
  }
})

onUnmounted(() => {
  document.body.classList.remove('page-with-custom-toast')
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
      toast(
        h(ToastContent, {
          content: 'Streamer disconnected',
          icon: 'heroicons:exclamation-circle',
          iconClass: 'text-red-500',
        })
      )
    } else {
      toast(
        h(ToastContent, {
          content: `Something went wrong: ${error.message ?? error}`,
          icon: 'heroicons:exclamation-circle',
          iconClass: 'text-red-500',
        })
      )
    }
  })

  if (data) {
    toast(
      h(ToastContent, {
        content: `Guess successfully sent to <b>${bot}</b> !`,
        icon: 'my-icons:chatguessr',
        iconClass: 'spinner',
      })
    )
  }
}

const triggerCoolDown = () => {
  guessDisabled.value = true
  setTimeout(() => {
    guessDisabled.value = false
  }, 5000)
}

const handleTwitchSignIn = () => {
  client.auth.signInWithOAuth({
    provider: 'twitch',
    options: { redirectTo: `${config.public.BASE_URL}/map/${bot}` },
  })
}

const handleTwitchSignOut = async () => {
  const { error } = await client.auth.signOut()
  if (error) {
    toast(
      h(ToastContent, {
        content: 'Something went wrong',
        icon: 'heroicons:exclamation-circle',
        iconClass: 'text-red-500',
      })
    )
  } else {
    user.value = null
    map.value.removeGuessMarker()
    toast(
      h(ToastContent, {
        content: 'Successfully logged out',
        icon: 'heroicons:shield-check',
        iconClass: 'text-primary',
      })
    )
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
    <div class="w-full absolute h-[4.4rem] flex flex-wrap items-center px-3 pointer-events-none z-10">
      <UiLogo :subtitle="bot" class="pointer-events-auto" />

      <div class="ml-auto pointer-events-auto">
        <div v-if="user" class="flex items-center gap-1">
          <UiColorPicker :avatar="user.avatar_url" ref="color" />
          <span class="hidden sm:block text-xl font-bold mr-3 text-shadow">{{ user.slug }}</span>
          <UiButton
            title="Sign out"
            icon="heroicons:arrow-right-start-on-rectangle-20-solid"
            class="bg-red-400 border-none"
            @click="handleTwitchSignOut()"
          ></UiButton>
        </div>
        <UiButton
          v-else
          title="Sign In with Twitch"
          icon="my-icons:twitch"
          class="bg-twitch-purple border-none"
          @click="handleTwitchSignIn()"
          >Sign In</UiButton
        >
      </div>
    </div>

    <Map :user="user" :bot="bot" ref="map" />

    <div
      v-if="bot && user && map?.coords"
      class="absolute bottom-3 px-3 w-full sm:w-[50%] sm:max-w-[28rem] left-1/2 -translate-x-1/2 z-10"
    >
      <button :disabled="guessDisabled" @click="handleGuess" class="btn-guess" title="(SPACE)">
        <span>GUESS</span>
      </button>
    </div>
  </div>
</template>

<style>
.page-with-custom-toast .Vue-Toastification__toast--default {
  bottom: 2.5rem;
}
@media only screen and (max-width: 600px) {
  .Vue-Toastification__container.bottom-center {
    bottom: 1.5em;
  }
}
</style>

<style scoped>
.btn-guess {
  @apply w-full text-black border border-white/30 bg-primary p-3 text-xl font-bold rounded-xl shadow-xl disabled:bg-black/40 disabled:cursor-not-allowed will-change-transform transition-transform;
}
.btn-guess:hover:not(:disabled) {
  transform: scale(0.98);
}
.btn-guess:active:not(:disabled) {
  transform: scale(0.96);
}
.btn-guess span {
  text-shadow: 0 0.1rem 0.1rem white;
}
</style>

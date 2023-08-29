<template>
    <div class="w-screen h-full select-none" :style="{ '--border-color': color?.hexColor }">
        <div class="w-full absolute h-20 flex flex-wrap items-center gap-2 px-3 pointer-events-none z-[2]">
            <UiLogo :subtitle="bot" class="pointer-events-auto" />
            <div class="ml-auto pointer-events-auto">
                <div v-if="user" class="flex items-center gap-1">
                    <UiColorPicker :avatar="user.avatar_url" ref="color" />
                    <span class="hidden sm:block text-xl font-bold mr-2 text-shadow">{{ user.slug }}</span>
                    <button class="btn btn-twitch" @click="handleTwitchLogout">Logout</button>
                </div>
                <button v-else class="btn btn-twitch inline-flex items-center gap-2" @click="handleTwitchLogin">
                    <img src="~/assets/icons/twitch-icon.svg" /> Login
                </button>
            </div>
        </div>

        <Map :user="user" :bot="bot" ref="map" />

        <div v-if="bot && user && map?.coords"
            class="flex absolute bottom-0 p-3 w-full sm:w-[40%] left-1/2 -translate-x-1/2 z-[1]">
            <button :disabled="guessDisabled" @click="handleGuess"
                class="cooldown relative w-full overflow-hidden bg-primary text-black p-3 text-xl font-bold rounded-lg shadow-lg disabled:bg-black disabled:bg-opacity-40 disabled:cursor-not-allowed"
                title="(SPACE)">
                GUESS
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CGIcon } from "@/utils/vue3-toastify-CG-icon";
const config = useRuntimeConfig();
definePageMeta({ layout: false });

const route = useRoute();
const bot = route.params.bot || route.query.bot;
useHead({ title: `ChatGuessr - Map${bot ? " - " + bot : ''}` })

const client = useSupabase();
const getUser = await client.auth.getUser();
const user = ref(getUser.data.user?.user_metadata);

const map = ref();
const color = ref();
const guessDisabled = ref();

const toast = useNuxtApp().$toast;

onMounted(async () => {
    if (!bot) {
        toast.error("Please fill your bot in the url parameters", { autoClose: false })
    }

    document.addEventListener("keyup", (e) => {
        if (e.key === ' ' || e.code === "Space" || e.keyCode === 32) {
            e.preventDefault();
            handleGuess();
        }
    })
});

const handleGuess = async () => {
    if (!user.value || !map.value?.coords || guessDisabled.value) return;

    triggerCoolDown();

    const session = await client.auth.getSession();

    const { error } = await useFetch(`${config.SOCKET_URL}/guess`, {
        method: 'POST',
        body: {
            access_token: session?.data?.session?.access_token,
            bot: bot,
            guess: `!g ${map.value.coords.lat}, ${map.value.coords.lng}`,
            color: color.value.hexColor,
        }
    })
    if (error.value) {
        if (error.value.data && error.value.data.message === "BOT_DISCONNECTED") {
            toast.error("Streamer disconnected");
	} else {
            toast.error(`Something went wrong: ${error.value.message ?? error.value}`);
        }
    }
    else {
        toast.success(`Guess successfully sent to <b>${bot}</b>`, { dangerouslyHTMLString: true, icon: CGIcon });
    }
}

const triggerCoolDown = () => {
    guessDisabled.value = true;
    setTimeout(() => {
        guessDisabled.value = false;
    }, 5000);
}

const handleTwitchLogin = () => {
    client.auth.signInWithOAuth({
        provider: 'twitch',
        options: { redirectTo: `${config.BASE_URL}/auth/redirect/${bot}` }
    })
}

const handleTwitchLogout = async () => {
    const { error } = await client.auth.signOut();
    if (error) {
        toast.error("Something went wrong");
    } else {
        user.value = null;
        map.value.removeGuessMarker();
        toast.success("Successfully logged out");
    }
}
</script>

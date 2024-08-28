<script setup>
const isModalOpen = ref(false)

useSeoMeta({
  title: 'Install',
  ogTitle: 'Install | ChatGuessr',
  description: 'How to install and set up ChatGuessr',
  ogDescription: 'How to install and set up ChatGuessr',
  twitterTitle: 'Install | ChatGuessr',
})
</script>

<template>
  <section>
    <h2 class="text-xl font-bold mb-2">How to set up ChatGuessr :</h2>
    <UiCard class="mb-12">
      <ol class="list-decimal ml-4 mb-6">
        <li>Download &amp; install ChatGuessr</li>
        <li>
          Log in using with your Twitch channel or a <strong>bot account</strong>.<br />
          <span class="text-sm text-gray-400"
            >You can log in with your main account, however a bot account is recommended for security and to prevent your main
            account's whispers from filling up.</span
          >
        </li>
        <li>
          <span class="flex items-center gap-1">
            Open the settings <UIcon name="i-heroicons:cog-6-tooth" class="w-5 h-5" /> on the top right menu
          </span>
        </li>
        <li>Go to <strong>Twitch connect</strong></li>
        <li>Fill in your streaming Twitch channel</li>
        <li>
          Press <strong>Save</strong><br />
          <span class="text-sm text-gray-400">
            The bot should now be talking in your chat. Your chatguessr link will be generated.
          </span>
        </li>
      </ol>
      <div class="bg-neutral-800 p-2 rounded-md">
        <h3 class="font-bold mb-1">Issues with Windows Defender</h3>
        <UiCard class="text-sm text-gray-400">
          <p>
            On install you may get a message stating: "Windows Defender SmartScreen prevented an unrecognizable app from starting.
            Running this app might put your PC at risk."
          </p>
          <p>
            You can safely ignore this message and continue with your installation
            <span class="cursor-help" @click="isModalOpen = true">💡</span>
          </p>
        </UiCard>
      </div>
    </UiCard>

    <h2 class="text-xl font-bold mb-2">How to add custom flags :</h2>
    <UiCard>
      <ol class="list-decimal ml-6 flex flex-col gap-1">
        <li>
          Navigate to the following path :
          <div class="flex flex-col sm:flex-row gap-1 mb-1">
            <span class="w-20 text-sm text-gray-400">Windows :</span>
            <UBadge class="w-fit">C:\Users\&lt;username&gt;\AppData\Roaming\chatguessr</UBadge>
          </div>
          <div class="flex flex-col sm:flex-row gap-1">
            <span class="w-20 text-sm text-gray-400">MacOS :</span>
            <UBadge class="w-fit">/Library/Application Support/chatguessr</UBadge>
          </div>
        </li>
        <li>Create a "flags" folder.</li>
        <li>
          <span>Copy your custom images and paste them into the "flags" folder you just created.</span><br />
          <span class="text-sm text-gray-400">Supported formats (.svg, .png, .jpg, .jpeg, .webp, .gif, .apng)</span>
        </li>
        <li>
          <span>Rename the image corresponding to the wanted Twitch command.</span><br />
          <span class="text-sm text-gray-400"
            >For example, the command for "myflag.png" will be <UBadge>!flag myflag</UBadge></span
          >
        </li>
      </ol>
    </UiCard>

    <UiModal v-show="isModalOpen" @close="isModalOpen = false">
      <img src="~/assets/windefender.png" alt="Windows Defender" />
    </UiModal>
  </section>
</template>

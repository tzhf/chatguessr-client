<script setup lang="ts">
import { countryCodes, USStatesCodes, NonTerritorialCodes } from '@/utils/countryCodes'
const { copy } = useClipboard()
const toast = useToast()

const copyToClipboard = (code: string) => {
  copy(`!flag ${code}`)
  toast.add({
    title: `
      <span class="flag-icon flag-icon-${code}"></span>
      <span class="rounded-md text-xs px-2 py-1 text-primary-500 ring-1 ring-inset ring-primary-500">!flag ${code}</span>
      copied to clipboard !
    `,
  })
}

useSeoMeta({
  title: 'Flags',
  ogTitle: 'Flags | ChatGuessr',
  description: 'All available ChatGuessr flags',
  ogDescription: 'All available ChatGuessr flags',
  twitterTitle: 'Flags | ChatGuessr',
})

onUnmounted(() => {
  toast.clear()
})
</script>

<template>
  <section>
    <h2 class="text-xl font-bold mb-2">Available flags</h2>
    <UiCard class="mb-6">
      <p>Click on a flag to copy the command or use the following commands :</p>
      <span class="flex flex-wrap gap-1">
        <UBadge size="md">!flag &lt;country code | country name&gt;</UBadge>
        <UBadge size="md">!flag random</UBadge>
        <UBadge size="md">!flag none</UBadge>
      </span>
    </UiCard>

    <div class="grid grid-cols-1 sm:grid-cols-[repeat(2,_1fr)] lg:grid-cols-[repeat(4,_1fr)] gap-1 pb-6">
      <Flag v-for="country in countryCodes" :flag="country" @click="copyToClipboard(country.code)" />
    </div>
    <h3 class="text-xl font-bold mb-2">US States :</h3>
    <div class="grid grid-cols-1 sm:grid-cols-[repeat(2,_1fr)] lg:grid-cols-[repeat(4,_1fr)] gap-1 pb-6">
      <Flag v-for="state in USStatesCodes" :flag="state" @click="copyToClipboard(state.code)" />
    </div>
    <h3 class="text-xl font-bold mb-2">Non Territorial Flags :</h3>
    <div class="grid grid-cols-1 sm:grid-cols-[repeat(2,_1fr)] lg:grid-cols-[repeat(4,_1fr)] gap-1">
      <Flag v-for="nonTerritorial in NonTerritorialCodes" :flag="nonTerritorial" @click="copyToClipboard(nonTerritorial.code)" />
    </div>
  </section>
</template>

<style>
@import '@/assets/css/flag-icon.min.css';
</style>

<script setup lang="ts">
defineProps<{
  item: MenuItem
}>()
</script>

<template>
  <li class="py-1.5" role="menuitem">
    <NuxtLink
      :to="item.to"
      :target="item.target"
      :title="item.label"
      exact-active-class="text-white bg-neutral-800"
      class="flex items-center gap-1.5 p-1.5 text-gray-400 hover:text-white hover:bg-neutral-800 cursor-pointer transition-colors rounded-md"
      @click="item.onClick"
    >
      <Icon v-if="item.icon" :name="item.icon" />
      <span v-if="item.label" :class="item.labelClass" class="truncate hidden lg:block">
        {{ item.label }}
      </span>
    </NuxtLink>
  </li>
</template>

<style>
nav li:has(a.router-link-active) {
  @apply border-b-2 border-primary;
}
</style>

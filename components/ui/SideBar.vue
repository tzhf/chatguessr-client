<template>
  <aside class="flex-shrink-0 bg-neutral-950 border-r border-neutral-700/50">
    <div class="sticky top-1 pt-1 flex flex-col sm:flex-row md:flex-col justify-between z-20">
      <UiHeading class="mb-10" />

      <div class="px-4 text-center">
        <slot />
      </div>
    </div>
  </aside>
</template>

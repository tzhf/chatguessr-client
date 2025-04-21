<template>
  <div class="max-w-screen-2xl mx-auto flex flex-col min-h-screen bg-neutral-950">
    <div class="sticky top-0 border-top items-start mt-2 z-10"></div>

    <div class="flex flex-col md:flex-row mb-5">
      <SideBar class="md:w-[22rem]">
        <Download class="mb-5" />
        <Contributors class="mb-5" />
      </SideBar>

      <div class="w-full">
        <NavigationMenu class="sticky top-[4px] z-10" />
        <main class="py-8 px-2 md:px-4">
          <slot />
        </main>
      </div>
    </div>

    <Footer class="mt-auto" />
  </div>
</template>

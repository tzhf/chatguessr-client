<template>
  <footer>
    <hr class="border-t border-neutral-700/50 mx-6" />
    <div class="grid md:grid-cols-4 gap-6 p-5 text-center text-gray-400">
      <section class="flex flex-col items-center gap-2">
        <h4 class="font-bold">Follow us on X</h4>
        <a href="https://x.com/chatguessr" target="_blank">
          <UIcon name="my-icons:x" size="20px" />
        </a>
      </section>

      <section class="flex flex-col items-center gap-2">
        <h4 class="font-bold">Support us</h4>
        <p class="text-sm">Any tip is greatly appreciated and help us to improve and maintain the application.</p>
        <UButton block color="orange" to="https://paypal.me/chatguessr" target="_blank" class="max-w-20">Donate</UButton>
      </section>

      <section class="flex flex-col items-center gap-2">
        <h4 class="font-bold">Developer ?</h4>
        <p class="text-sm">
          ChatGuessr is open-source, feel free to suggest new features and submit your pull requests to our Github repository.
        </p>
        <a href="https://github.com/tzhf/chatguessr" target="_blank">
          <UIcon name="my-icons:github" size="25px" />
        </a>
      </section>

      <section class="flex flex-col items-center gap-2">
        <h4 class="font-bold">Contact</h4>
        <p class="text-sm">
          For any inquiries:<br />
          <a href="mailto:chatguessr@gmail.com">chatguessr@gmail.com</a>
        </p>
      </section>
    </div>
  </footer>
</template>

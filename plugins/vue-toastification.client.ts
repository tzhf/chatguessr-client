// plugins/vue-toastification.client.ts
import { defineNuxtPlugin } from '#app'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    toastClassName: 'custom-toast',
    bodyClassName: 'custom-toast-body',
    position: 'bottom-center',
    timeout: 5000,
    closeButton: false,
    icon: false,
  }

  nuxtApp.vueApp.use(Toast, options)
})

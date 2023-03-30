import Vue3Toastify, { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Vue3Toastify, {
        theme: "dark",
        position: "bottom-center",
        autoClose: 4000,
        style: {
            opacity: ".8",
        },
        closeButton: false,
    });

    return {
        provide: { toast },
    };
});

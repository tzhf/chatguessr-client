// @ts-ignore
import JsonExcel from "vue-json-excel3";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("download-excel", JsonExcel);
});

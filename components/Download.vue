<template>
    <section class="flex flex-col mx-auto sm:mx-0 gap-1 text-center">
        <h2 class="text-xl">Download</h2>
        <button @click="winDownload" class="btn btn-bordered relative btn-sep icon-win">Windows</button>
        <button @click="macOSDownload" class="btn btn-bordered relative btn-sep icon-apple">macOS</button>
        <button @click="linuxDownload" class="btn btn-bordered relative btn-sep icon-linux">Linux <small>(.deb)</small></button>
        <span class="text-xs font-bold">version {{ currentVersion }}</span>
        <span class="text-xs">automatic updates only work for Windows*</span>
    </section>
</template>
<script setup>
// We could fetch latest release from github but there are some API quota limitations
const currentVersion = ref("3.0.1");
const winDownload = () => {
    window.open(
        `https://github.com/tzhf/chatguessr/releases/download/v${currentVersion.value}/chatguessr-${currentVersion.value}-Setup.exe`,
        "_blank"
    );
};
const macOSDownload = () => {
    window.open(
        `https://github.com/tzhf/chatguessr/releases/download/v${currentVersion.value}/chatguessr-darwin-x64-${currentVersion.value}.zip`,
        "_blank"
    );
};
const linuxDownload = () => {
    window.open(
        `https://github.com/tzhf/chatguessr/releases/download/v${currentVersion.value}/chatguessr_${currentVersion.value}_amd64.deb`,
        "_blank"
    );
};
</script>
<style>
.btn-sep:before {
    font-family: "FontAwesome";
    background: #42dfba;
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    font-size: 2rem;
    width: 3rem;
}

.icon-win:before {
    content: url("~/assets/icons/windows-icon.svg");
}

.icon-apple:before {
    content: url("~/assets/icons/apple-icon.svg");
}

.icon-linux:before {
    content: url("~/assets/icons/linux-icon.svg");
}
</style>

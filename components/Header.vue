<template>
    <header class="flex flex-col md:flex-row justify-between gap-10 p-2">
        <div>
            <nuxt-link to="/">
                <h1 class="font-light -ml-3 -mt-2 text-white text-shadow heading">
                    <div><span class="font-bold text-primary">C</span>hat</div>
                    <div><span class="font-bold text-primary">G</span>uessr</div>
                </h1>
            </nuxt-link>
            <p class="text-xs leading-3">
                A Twitch chatbot for <a href="https://www.geoguessr.com" target="_blank">GeoGuessr</a>.
            </p>
        </div>
        <slot />
    </header>
</template>
<style scoped>
.heading {
    line-height: 0.7;
    font-size: clamp(3.5rem, 15vw, 4rem);
    letter-spacing: -9px;
}

.btn-sep:before {
    font-family: "FontAwesome";
    position: absolute;
    left: 0;
    top: 0;
    line-height: 1.5;
    font-size: 1.7rem;
    width: 3rem;
}

.btn-sep:after {
    content: "";
    position: absolute;
}

.icon-win:before {
    content: "\f17a";
}

.icon-apple:before {
    content: "\f179";
}

.icon-linux:before {
    content: "\f17c";
}
</style>

<template>
    <main>
        <Header />
        <section>
            <h2 class="text-3xl font-bold text-center">Available flags</h2>
            <p class="text-center mb-5"><span class="badge bg-primary text-center">!flag &lt;country code or country
                    name&gt; |
                    random |
                    none</span></p>
            <p class="font-bold text-center">Click a flag to copy the command.</p>
            <div class="grid grid-cols-1 md:grid-cols-[repeat(4,_1fr)] gap-2">
                <Flag v-for="country in countryCodes" :flag="country" />
            </div>
            <h3 class="pt-6 pb-2 font-bold text-2xl text-center">US States</h3>
            <div class="grid grid-cols-1 md:grid-cols-[repeat(4,_1fr)] gap-2">
                <Flag v-for="state in USStatesCodes" :flag="state" />
            </div>
            <h3 class="pt-6 pb-2 font-bold text-2xl text-center">Non Territorial Flags</h3>
            <div class="grid grid-cols-1 md:grid-cols-[repeat(4,_1fr)] gap-2">
                <Flag v-for="nonTerritorial in NonTerritorialCodes" :flag="nonTerritorial" />
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { countryCodes, USStatesCodes, NonTerritorialCodes } from "@/utils/countryCodes";
useHead({
    title: "ChatGuessr - Flags",
    meta: [
        { hid: "og-title", property: "og:title", content: "ChatGuessr - Flags" },
        { hid: "og-desc", property: "og:description", content: "Available ChatGuessr flags." },
    ],
})
</script>
<style>
@import "@/assets/css/flag-icon.min.css";
</style>
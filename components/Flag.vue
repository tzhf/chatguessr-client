<template>
    <div role="button" class="card flex items-center hover:scale-[0.99] active:scale-[0.98]" @click="copy"
        v-tippy="{ trigger: 'click', content: 'Copied!', animation: 'shift-away', theme: 'custom' }">
        <span :class="'flag-icon flag-icon-' + flag.code"></span>
        <pre class="mx-2">{{ flag.code }}</pre> {{ flag.names }}
    </div>
</template>

<script setup lang="ts">
import copyToClipboard from "copy-to-clipboard";

const props = defineProps<{
    flag: {
        code: string;
        names: string;
    }
}>()

const copy = () => {
    copyToClipboard(`!flag ${props.flag.code}`);
}
</script>

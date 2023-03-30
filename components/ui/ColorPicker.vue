<template>
    <color-picker :style="{ '--avatar': `url(${avatar})` }" :="color" @input="onColorInput" @change="onColorChange"
        :initially-collapsed="true"></color-picker>
</template>

<script setup lang="ts">
import ColorPicker from '@radial-color-picker/vue-color-picker';
import "@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css";

defineProps<{ avatar: string }>()

const color = ref<hsl>({
    hue: 166,
    saturation: 100,
    luminosity: 60,
})

onMounted(() => {
    const storedColor = JSON.parse(localStorage.getItem("color"));
    if (storedColor && typeof (storedColor.hue) === 'number' && typeof (storedColor.luminosity) === 'number' && typeof (storedColor.saturation) === 'number') {
        color.value = storedColor;
    }
})

const onColorInput = (hue: number) => {
    color.value.hue = hue;
}

const onColorChange = () => {
    localStorage.setItem("color", JSON.stringify(color.value));
};

const hexColor = computed(() => {
    return hslToHex(color.value);
})

const hslToHex = (color: hsl): string => {
    let { hue, saturation, luminosity } = color;
    luminosity /= 100;
    const a = (saturation * Math.min(luminosity, 1 - luminosity)) / 100;
    const f = (n: number) => {
        const k = (n + hue / 30) % 12;
        const color = luminosity - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

defineExpose({ hexColor })
</script>

<style>
.rcp {
    width: 60px;
    height: 60px;
    margin: 2px;
}

.rcp__well {
    background-image: var(--avatar);
    background-size: contain;
    width: 65%;
    height: 65%;
    top: 18%;
    left: 18%;
    border: none;
    outline: 2px solid v-bind(hexColor);
}

.rcp__well:hover {
    box-shadow: 0 0 3px 3px #333;
}

.rcp__knob {
    width: 20%;
    height: 20%;
    top: -1.5%;
    cursor: pointer;
}
</style>
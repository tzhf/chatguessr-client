<template>
    <div class="relative w-full h-full overflow-hidden min-h-[60vh]">
        <div id="map" class="absolute w-full h-full z-[1]"></div>
        <div class="absolute right-0 bottom-16 sm:bottom-0 flex flex-col gap-[2px] p-3 z-[2]">
            <button v-for="layer in layers" @click="switchLayer(layer)"
                class="btn bg-opacity-70 hover:bg-opacity-80 font-bold max-sm:text-xs max-sm:p-1.5"
                :class="[currentLayer?.options.id === layer.options.id ? 'bg-primary text-black' : 'bg-black']"
                :title="layer.options.title">
                {{ layer.options.id }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import copyToClipboard from "copy-to-clipboard";

const props = defineProps(['user', 'bot', 'locations'])

const layers = ref();
const currentLayer = ref();
const switchLayer = ref();
const guessMarker = ref();
const drawPlayerGuesses = ref();
const removeGuessMarker = ref();
const coords = ref();

onMounted(async () => {
    const L = await import("leaflet")
    const { GeodesicLine } = await import("leaflet.geodesic");

    layers.value = {
        Roadmap: L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en", {
            id: "Roadmap",
            minZoom: 2,
            maxZoom: 21,
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
            title: "1️⃣"
        } as TileLayerOptions),
        Terrain: L.tileLayer("https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}&hl=en", {
            id: "Terrain",
            minZoom: 2,
            maxZoom: 21,
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
            title: "2️⃣"
        } as TileLayerOptions),
        Hybrid: L.tileLayer("https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}&hl=en", {
            id: "Hybrid",
            minZoom: 2,
            maxZoom: 21,
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
            title: "3️⃣"
        } as TileLayerOptions),
        Satellite: L.tileLayer("https://{s}.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}", {
            id: "Satellite",
            minZoom: 2,
            maxZoom: 21,
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
            title: "4️⃣"
        } as TileLayerOptions),
        OpenTopoMap: L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
            id: "OpenTopoMap",
            minZoom: 2,
            maxZoom: 19,
            title: "5️⃣"
        } as TileLayerOptions),
        EsriTopographic: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
            id: "EsriTopographic",
            minZoom: 2,
            maxZoom: 19,
            title: "6️⃣"
        } as TileLayerOptions),
    };

    const map = L.map("map", {
        attributionControl: false,
        center: [0, 0],
        zoom: 2,
        minZoom: 2,
        zoomControl: false,
        worldCopyJump: true
    });
    L.control.zoom({ position: "bottomleft" }).addTo(map);

    const storedLayer = localStorage.getItem("mapLayer");
    currentLayer.value = storedLayer && storedLayer in layers.value ? layers.value[storedLayer] : layers.value["Roadmap"];
    currentLayer.value.addTo(map);

    if (props.bot) {
        if (props.user) {
            const markerAvatar = L.icon({
                iconUrl: props.user.avatar_url,
                iconSize: [30, 30],
                iconAnchor: [15, 15],
                popupAnchor: [0, -15],
            });
            guessMarker.value = L.marker([0, 0], { icon: markerAvatar });
            guessMarker.value.addTo(map);
        }
        else {
            L.popup({ closeButton: false }).setLatLng([0, 0]).setContent("<b>Click on the map to make your guess !</b>").openOn(map);
        }
    }

    map.on("click", (e: any) => {
        if (!props.bot) return;
        coords.value = map.wrapLatLng(e.latlng);
        const command = `/w ${props.bot} !g ${coords.value.lat}, ${coords.value.lng}`;
        copyToClipboard(command);

        if (props.user) {
            guessMarker.value.setLatLng(e.latlng);
        } else {
            L.popup({ closeButton: false })
                .setLatLng(e.latlng)
                .setContent(`${command}<br><span class="font-bold text-lg">Copied to clipboard</span><br><small>Paste (ctrl+v) without editing</small>`)
                .openOn(map);
        }
    })

    removeGuessMarker.value = () => {
        if (guessMarker.value) map.removeLayer(guessMarker.value);
    }

    if (props.locations) {
        const locs = props.locations.map((location: Location, index: number) => {
            const icon = makeIcon("#de3e3e", index + 1);

            const marker = L.marker([location.lat, location.lng], { icon: icon })
            marker.on("click", () => {
                const url = new URL("https://www.google.com/maps/@?api=1&map_action=pano");
                if (location.panoId) url.searchParams.set("pano", location.panoId);
                url.searchParams.set("viewpoint", `${location.lat},${location.lng}`);
                url.searchParams.set("heading", String(location.heading));
                url.searchParams.set("pitch", String(location.pitch));
                const fov = 180 / 2 ** location.zoom;
                url.searchParams.set("fov", String(fov));
                window.open(url, "_blank");
            });
            return marker;
        })
        L.layerGroup(locs).addTo(map);
    }

    let playerGuessesLayer: L.LayerGroup;
    drawPlayerGuesses.value = (player: PlayerResult) => {
        if (playerGuessesLayer) map.removeLayer(playerGuessesLayer);
        playerGuessesLayer = new L.LayerGroup().addTo(map);

        const icon = makeIcon(player.color);

        player.guesses.forEach((guess, index) => {
            if (!guess) return;
            L.marker([guess.lat, guess.lng], { icon: icon }).addTo(playerGuessesLayer);
            new GeodesicLine([guess, props.locations[index]], { color: player.color || '#fff', weight: 3, opacity: 0.7, steps: 200 }).addTo(playerGuessesLayer);
        })
    }

    switchLayer.value = (selected: L.TileLayer) => {
        if (currentLayer.value.options.id === selected.options.id) return;
        map.removeLayer(currentLayer.value);
        currentLayer.value = selected;
        map.addLayer(currentLayer.value);
        localStorage.setItem("mapLayer", selected?.options?.id || "Terrain");
    }

    document.addEventListener("keydown", (e) => {
        switch (e.code) {
            case "Digit1" || "Numpad1":
                switchLayer.value(layers.value["Roadmap"]);
                break;
            case "Digit2" || "Numpad2":
                switchLayer.value(layers.value["Terrain"]);
                break;
            case "Digit3" || "Numpad3":
                switchLayer.value(layers.value["Hybrid"]);
                break;
            case "Digit4" || "Numpad4":
                switchLayer.value(layers.value["Satellite"]);
                break;
            case "Digit5" || "Numpad5":
                switchLayer.value(layers.value["OpenTopoMap"]);
                break;
            case "Digit6" || "Numpad6":
                switchLayer.value(layers.value["EsriTopographic"]);
                break;
        }
    })

    function makeIcon(color: string, index?: number) {
        const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="43"><path fill="${color || '#fff'}" fill-opacity=".8" stroke="#000" stroke-opacity=".8" d="M13.04,41.77c-0.11-1.29-0.35-3.2-0.99-5.42c-0.91-3.17-4.74-9.54-5.49-10.79c-3.64-6.1-5.46-9.21-5.45-12.07 c0.03-4.57,2.77-7.72,3.21-8.22c0.52-0.58,4.12-4.47,9.8-4.17c4.73,0.24,7.67,3.23,8.45,4.07c0.47,0.51,3.22,3.61,3.31,8.11 c0.06,3.01-1.89,6.26-5.78,12.77c-0.18,0.3-4.15,6.95-5.1,10.26c-0.64,2.24-0.89,4.17-1,5.48C13.68,41.78,13.36,41.78,13.04,41.77z"/>${index ? '<text x="33%" y="47%" class="font-bold text-lg">' + index + '</text>' : ''}</svg>`;
        return L.divIcon({
            className: "svg-icon",
            html: svgTemplate,
            iconSize: [28, 43],
            iconAnchor: [14, 43]
        });
    }
})

defineExpose({ coords, removeGuessMarker, drawPlayerGuesses })
</script>
<style>
#map:focus-visible {
    outline: none;
}

.leaflet-container {
    background-color: #2e2e2e;
}

@media screen and (max-width: 640px) {
    .leaflet-bottom {
        bottom: 4rem;
    }
}

/* Leaflet Zoom controls */
.leaflet-bar a {
    background: rgba(22, 22, 22, 0.568);
    color: rgb(255, 255, 255);
}

.leaflet-bar a:hover {
    background: rgba(22, 22, 22, 0.726);
    color: rgb(255, 255, 255);
}

.leaflet-bar a.leaflet-disabled,
.leaflet-bar a.leaflet-disabled:hover {
    background: rgba(22, 22, 22, 0.801);
    color: rgb(170, 170, 170);
}

/* Leaflet Popup */
.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
    background-color: rgba(0, 0, 0, 0.6);
}

.leaflet-popup-content-wrapper {
    color: #fff;
    text-align: center;
}

.leaflet-popup-content {
    margin: 10px;
}

.leaflet-marker-icon {
    border: 2px solid var(--border-color);
    border-radius: 50%;
}
</style>
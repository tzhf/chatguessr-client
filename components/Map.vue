<script setup lang="ts">
import 'leaflet/dist/leaflet.css'

const { copy } = useClipboard()

const props = defineProps(['user', 'bot', 'locations'])

const layers = ref()
const currentLayer = ref()
const switchLayer = ref()
const guessMarker = ref()
const drawPlayerGuesses = ref()
const removeGuessMarker = ref()
const coords = ref()

onMounted(async () => {
  const L = await import('leaflet')
  const { GeodesicLine } = await import('leaflet.geodesic')

  layers.value = {
    Roadmap: L.tileLayer(
      'https://www.google.com/maps/vt?pb=!1m7!8m6!1m3!1i{z}!2i{x}!3i{y}!2i9!3x1!2m2!1e0!2sm!3m3!2sen!3sus!5e18!4e0!5m4!1e0!8m2!1e1!1e1!6m6!1e12!2i2!11e0!39b0!44e0!50e0',
      {
        id: 'Roadmap',
        minZoom: 2,
        maxZoom: 21,
        title: '1️⃣',
      } as TileLayerOptions
    ),
    Terrain: L.tileLayer(
      'https://www.google.com/maps/vt?pb=!1m7!8m6!1m3!1i{z}!2i{x}!3i{y}!2i9!3x1!2m2!1e0!2sm!2m1!1e4!3m5!2sen!3sus!5e18!12m1!1e67!4e0!5m4!1e0!8m2!1e1!1e1!6m6!1e12!2i2!11e0!39b0!44e0!50e0',
      {
        id: 'Terrain',
        minZoom: 2,
        maxZoom: 21,
        title: '2️⃣',
      } as TileLayerOptions
    ),
    Hybrid: L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}&hl=en', {
      id: 'Hybrid',
      minZoom: 2,
      maxZoom: 21,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      title: '3️⃣',
    } as TileLayerOptions),
    Satellite: L.tileLayer('https://{s}.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', {
      id: 'Satellite',
      minZoom: 2,
      maxZoom: 21,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      title: '4️⃣',
    } as TileLayerOptions),
    OpenStreetMap: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      id: 'OpenStreetMap',
      minZoom: 2,
      maxZoom: 19,
      title: '5️⃣',
    } as TileLayerOptions),
    OpenTopoMap: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      id: 'OpenTopoMap',
      minZoom: 2,
      maxZoom: 19,
      title: '6️⃣',
    } as TileLayerOptions),
  }

  const map = L.map('map', {
    attributionControl: false,
    center: [0, 0],
    zoom: 2,
    minZoom: 2,
    worldCopyJump: true,
  })
  map.zoomControl.setPosition('bottomleft')

  const storedLayer = localStorage.getItem('mapLayer')
  currentLayer.value = storedLayer && storedLayer in layers.value ? layers.value[storedLayer] : layers.value['Roadmap']
  currentLayer.value.addTo(map)

  if (props.bot) {
    if (props.user) {
      const markerAvatar = L.icon({
        iconUrl: props.user.avatar_url,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
      })
      guessMarker.value = L.marker([0, 0], { icon: markerAvatar })
      guessMarker.value.addTo(map)
    } else {
      L.popup({ closeButton: false })
        .setLatLng([0, 0])
        .setContent('<span class="font-bold">Click on the map to make your guess !</span>')
        .openOn(map)
    }
  }

  map.on('click', (e: any) => {
    if (!props.bot) return
    coords.value = map.wrapLatLng(e.latlng)
    const command = `/w ${props.bot} !g ${coords.value.lat}, ${coords.value.lng}`
    copy(command)

    if (props.user) {
      guessMarker.value.setLatLng(e.latlng)
    } else {
      L.popup({ closeButton: false })
        .setLatLng(e.latlng)
        .setContent(
          `
          ${command}<br>
          <span class="font-bold">Copied to clipboard !</span><br>
          <span class="text-xs text-gray-300">Paste the command without editing.</span>
        `
        )
        .openOn(map)
    }
  })

  removeGuessMarker.value = () => {
    if (guessMarker.value) map.removeLayer(guessMarker.value)
  }

  if (props.locations) {
    const locs = props.locations.map((location: Location, index: number) => {
      const icon = L.icon({
        iconUrl: '../correct-location.webp',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
        className: 'correct-location',
      })
      const marker = L.marker([location.lat, location.lng], { icon: icon })
      marker.bindTooltip(`${index + 1}`, {
        permanent: true,
        direction: 'center',
        className: 'correct-location-label',
      })
      marker.on('click', () => {
        const url = new URL('https://www.google.com/maps/@?api=1&map_action=pano')
        if (location.panoId) url.searchParams.set('pano', location.panoId)
        url.searchParams.set('viewpoint', `${location.lat},${location.lng}`)
        url.searchParams.set('heading', String(location.heading))
        url.searchParams.set('pitch', String(location.pitch))
        const fov = 180 / 2 ** location.zoom
        url.searchParams.set('fov', String(fov))
        window.open(url, '_blank')
      })
      return marker
    })
    L.layerGroup(locs).addTo(map)
  }

  let playerGuessesLayer: L.LayerGroup
  drawPlayerGuesses.value = (player: PlayerResult) => {
    if (playerGuessesLayer) map.removeLayer(playerGuessesLayer)
    playerGuessesLayer = new L.LayerGroup().addTo(map)

    const icon = L.icon({
      iconUrl: player.player.avatar ?? '../avatar-default.jpg',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
    })

    player.guesses.forEach((guess, index) => {
      if (!guess) return

      L.marker([guess.lat, guess.lng], { icon: icon }).addTo(playerGuessesLayer)
      new GeodesicLine([guess, props.locations[index]], {
        color: player.player.color || '#fff',
        weight: 3,
        opacity: 1,
        steps: 200,
      }).addTo(playerGuessesLayer)
    })
  }

  switchLayer.value = (selected: L.TileLayer) => {
    if (currentLayer.value.options.id === selected.options.id) return

    map.removeLayer(currentLayer.value)
    currentLayer.value = selected
    map.addLayer(currentLayer.value)
    localStorage.setItem('mapLayer', selected?.options?.id || 'Terrain')
  }

  document.addEventListener('keydown', (e) => {
    switch (e.code) {
      case 'Digit1' || 'Numpad1':
        switchLayer.value(layers.value['Roadmap'])
        break
      case 'Digit2' || 'Numpad2':
        switchLayer.value(layers.value['Terrain'])
        break
      case 'Digit3' || 'Numpad3':
        switchLayer.value(layers.value['Hybrid'])
        break
      case 'Digit4' || 'Numpad4':
        switchLayer.value(layers.value['Satellite'])
        break
      case 'Digit5' || 'Numpad5':
        switchLayer.value(layers.value['OpenStreetMap'])
        break
      case 'Digit6' || 'Numpad6':
        switchLayer.value(layers.value['OpenTopoMap'])
        break
    }
  })
})

defineExpose({ coords, removeGuessMarker, drawPlayerGuesses })
</script>

<template>
  <div class="relative w-full h-full overflow-hidden min-h-[60vh]">
    <div id="map" class="absolute w-full h-full z-[1]"></div>
    <div class="absolute right-0 bottom-16 sm:bottom-0 flex flex-col gap-0.5 p-3 z-[2]">
      <button
        v-for="layer in layers"
        @click="switchLayer(layer)"
        :class="['layer__button', currentLayer?.options.id === layer.options.id ? 'bg-primary text-black' : 'bg-black']"
        :title="layer.options.title"
      >
        {{ layer.options.id }}
      </button>
    </div>
  </div>
</template>

<style>
.layer__button {
  @apply p-2 rounded-md font-bold text-sm max-sm:text-xs max-sm:p-1.5 hover:brightness-105 active:brightness-110 bg-opacity-70 hover:bg-opacity-80 shadow-lg outline-none transition duration-200;
}

#map:focus-visible {
  outline: none;
}

.leaflet-container {
  background-color: #1d1d1d;
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
.correct-location {
  border: 2px solid var(--border-color);
  z-index: 999 !important;
}
.correct-location-label {
  display: flex;
  line-height: 1rem;
  align-items: center;
  justify-content: center;
  padding: 2px;
  top: 10px;
  left: 10px;
  border-radius: 50%;
  width: 15px;
  height: 15px;
}
</style>

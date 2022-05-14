<template>
	<div :style="{ '--border-color': hexColor }">
		<div class="fixed top header">
			<Logo :subtitle="bot" />

			<div v-if="user" class="flex twitch__section">
				<color-picker
					:style="{ '--avatar': `url(${user.avatar_url})` }"
					v-bind="color"
					@input="onColorInput"
					@change="onColorChange"
					:initially-collapsed="true"
				></color-picker>
				<h4>{{ user.slug }}</h4>
				<button class="btn twitchLoginBtn" @click="handleTwitchLogout()">Logout</button>
			</div>
			<button v-else class="btn twitchLoginBtn" @click="handleTwitchLogin()"><img src="~/assets/twitch-icon.svg" /> Login</button>
		</div>
		<div id="map"></div>
		<div v-if="bot && user" class="flex guessBtn__wrapper">
			<button class="btn cooldown guessBtn" :disabled="disabled" title="(SPACE)" alt="Guess Button" @click="handleGuess()">GUESS</button>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { supabase } from "~/supabase";
import ColorPicker from "@radial-color-picker/vue-color-picker";

export default {
	components: {
		ColorPicker,
	},
	data() {
		return {
			bot: "",
			user: null,
			map: null,
			customMarker: {},
			coords: { lat: 0, lng: 0 },
			disabled: false,
			color: {
				hue: 166,
				saturation: 100,
				luminosity: 60,
			},
		};
	},
	computed: {
		hexColor: function () {
			return this.hslToHex(this.color);
		},
	},
	head() {
		return {
			title: `ChatGuessr - Map${this.bot ? ` - ${this.bot}` : ""}`,
			script: [
				{
					hid: "leaflet",
					src: "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js",
					callback: () => this.initMap(),
				},
			],
		};
	},
	created() {
		const user = supabase.auth.user();
		this.user = user?.user_metadata;

		const params = Object.keys(this.$route.query);
		if (params.includes("bot")) {
			this.bot = this.$route.query.bot;
		} else {
			this.bot = this.$route.params.bot;
		}
	},
	mounted() {
		localStorage.setItem("currentBot", this.bot || "");

		this.color = JSON.parse(localStorage.getItem("color")) || this.color;

		document.addEventListener("keydown", (e) => {
			if (e.code === "Space") {
				e.preventDefault();
				if (!this.user) return;
				this.handleGuess();
			}
		});
	},
	methods: {
		handleGuess: function () {
			if (this.disabled) return;
			this.triggerCoolDown();
			const { access_token } = supabase.auth.session();

			axios
				.post(`${process.env.SOCKET_URL}/guess`, {
					access_token,
					bot: this.bot,
					guess: `!g ${this.coords.lat}, ${this.coords.lng}`,
					color: this.hexColor,
				})
				.then(() => {
					this.$toast.success(`Guess successfully sent to ${this.bot}`, { duration: 4000 });
				})
				.catch((e) => {
					if (e.response.data.message === "BOT_DISCONNECTED") {
						this.$toast.error(`Streamer disconnected or not using the latest CG version`, { duration: 6000 });
					} else {
						this.$toast.error(`Something went wrong ${e}`, { duration: 4000 });
					}
				});
		},
		handleTwitchLogin: async function () {
			await supabase.auth.signIn({ provider: "twitch" }, { redirectTo: `${process.env.BASE_URL}/auth/redirect` });
		},
		handleTwitchLogout: async function () {
			const { error } = await supabase.auth.signOut();
			if (error) {
				this.$toast.error(`Something went wrong: {error}`, { duration: 4000 });
			} else {
				this.user = null;
				this.map.removeLayer(this.customMarker);
				this.$toast.success("Successfully logged out", { duration: 4000 });
			}
		},
		initMap: function () {
			const layers = {
				Roadmap: L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en", {
					minZoom: 2,
					maxZoom: 21,
					subdomains: ["mt0", "mt1", "mt2", "mt3"],
					type: "Roadmap",
				}),

				Terrain: L.tileLayer("https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}&hl=en", {
					minZoom: 2,
					maxZoom: 20,
					subdomains: ["mt0", "mt1", "mt2", "mt3"],
					type: "Terrain",
				}),

				Hybrid: L.tileLayer("https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}&hl=en", {
					minZoom: 2,
					maxZoom: 20,
					subdomains: ["mt0", "mt1", "mt2", "mt3"],
					type: "Hybrid",
				}),

				Satellite: L.tileLayer("https://{s}.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}", {
					minZoom: 2,
					maxZoom: 20,
					subdomains: ["mt0", "mt1", "mt2", "mt3"],
					type: "Satellite",
				}),

				OpenTopoMap: L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
					minZoom: 2,
					maxZoom: 19,
					type: "OpenTopoMap",
				}),

				EsriTopographic: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
					minZoom: 2,
					maxZoom: 19,
					type: "EsriTopographic",
				}),
			};

			const mapOptions = {
				attributionControl: false,
				center: [0, 0],
				zoom: 2,
				zoomControl: false,
			};

			this.map = L.map("map", mapOptions);
			getMapLayer().addTo(this.map);

			function getMapLayer() {
				const cBaseMap = localStorage.getItem("mapLayer");
				if (cBaseMap != "") {
					const layer = layers[cBaseMap];
					if (!layer) {
						return layers["Roadmap"];
					} else {
						return layer;
					}
				} else {
					return layers["Roadmap"];
				}
			}

			// Layer/zoom controls
			L.control.layers({ ...layers }, {}, { position: "bottomright", collapsed: false }).addTo(this.map);
			L.control.zoom({ position: "bottomright" }).addTo(this.map);

			this.map.on("baselayerchange", onBaseLayerChange);

			function onBaseLayerChange() {
				const id = event.currentTarget.layerId;
				const layer = this._layers[id];
				const baseMap = layer.options.type;
				localStorage.setItem("mapLayer", baseMap);
			}

			if (this.bot) {
				if (this.user) {
					const markerAvatar = L.icon({
						iconUrl: this.user.avatar_url,
						iconSize: [30, 30],
						iconAnchor: [15, 15],
						popupAnchor: [0, -15],
					});
					this.customMarker = L.marker([0, 0], { icon: markerAvatar });
					this.customMarker.addTo(this.map);
				} else {
					L.popup().setLatLng([0, 0]).setContent("Click on the map to make your guess !").openOn(this.map);
				}
			} else {
				this.$toast.error("Please fill your bot in the url parameters");
			}

			this.map.on("click", (e) => {
				if (!this.bot) return;
				this.disabled = false;

				this.coords = this.map.wrapLatLng(e.latlng);
				const command = `/w ${this.bot} !g ${this.coords.lat}, ${this.coords.lng}`;
				this.copyToClipboard(command);

				if (this.user) {
					this.customMarker.setLatLng(e.latlng);
				} else {
					L.popup()
						.setLatLng(e.latlng)
						.setContent(`${command}<br><span class="copy">Copied to clipboard</span><br><small>Paste (ctrl+v) without editing</small>`)
						.openOn(this.map);
				}
			});
		},
		triggerCoolDown: function () {
			new Promise((resolve) => {
				this.disabled = true;
				setTimeout(() => {
					resolve();
				}, 5000);
			}).then(() => {
				this.disabled = false;
			});
		},
		// Copy to clipboard
		copyToClipboard: function (str) {
			const el = document.createElement("textarea");
			el.value = str;
			el.setAttribute("readonly", "");
			el.style = { position: "absolute", left: "-9999px" };
			document.body.appendChild(el);

			// FOR MAC OS USERS
			if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
				// save current contentEditable/readOnly status
				const editable = el.contentEditable;
				const readOnly = el.readOnly;
				// convert to editable with readonly to stop iOS keyboard opening
				el.contentEditable = true;
				el.readOnly = true;
				// create a selectable range
				const range = document.createRange();
				range.selectNodeContents(el);
				// select the range
				const selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);
				el.setSelectionRange(0, 999999);
				// restore contentEditable/readOnly to original state
				el.contentEditable = editable;
				el.readOnly = readOnly;
			} else {
				el.select();
			}

			document.execCommand("copy");
			document.body.removeChild(el);
		},
		onColorInput(hue) {
			this.color.hue = hue;
		},
		onColorChange() {
			localStorage.setItem("color", JSON.stringify(this.color));
		},
		hslToHex: function (color) {
			let { hue, saturation, luminosity } = color;
			luminosity /= 100;
			const a = (saturation * Math.min(luminosity, 1 - luminosity)) / 100;
			const f = (n) => {
				const k = (n + hue / 30) % 12;
				const color = luminosity - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
				return Math.round(255 * color)
					.toString(16)
					.padStart(2, "0");
			};
			return `#${f(0)}${f(8)}${f(4)}`;
		},
	},
};
</script>

<style>
@import url("https://unpkg.com/leaflet@1.7.1/dist/leaflet.css");
@import "@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css";

#map {
	z-index: 0;
	height: 100vh;
}
.leaflet-control-layers {
	background-color: rgba(0, 0, 0, 0.6) !important;
	color: rgb(255, 255, 255);
	font-size: 1.2em;
}

@media screen and (max-width: 800px) {
	.leaflet-bottom {
		bottom: 4.5rem;
	}
	.guessBtn__wrapper {
		width: 100% !important;
	}
}
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
.leaflet-touch .leaflet-control,
.leaflet-touch .leaflet-bar {
	border: 1px solid var(--clr-primary);
}
.gm-style-cc {
	display: none;
}
.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
	background-color: rgba(0, 0, 0, 0.6);
}
.leaflet-popup-content-wrapper {
	color: #fff;
	text-align: center;
}
.leaflet-popup-content {
	margin: 7px 18px;
}
.leaflet-container a.leaflet-popup-close-button {
	color: var(--clr-primary);
}
.leaflet-container {
	background-color: #2e2e2e;
}
.copy {
	font-size: 14px;
	font-weight: 700;
}
.toasted.toasted-primary.success {
	color: #000;
	font-weight: 700;
	background: var(--clr-primary) !important;
}
.header {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	z-index: 99;
	pointer-events: none;
}
.header > * {
	pointer-events: initial;
}
.twitch__section {
	margin-left: auto;
	justify-content: space-around;
	overflow: hidden;
	text-overflow: ellipsis;
}
.twitch__section h4 {
	text-shadow: 0 0 3px #000;
}
.twitchLoginBtn {
	height: 45px;
	background: #815fc0;
	margin-left: 1rem;
}
.avatar {
	vertical-align: middle;
	width: 40px;
	height: 40px;
}
.avatar,
.leaflet-marker-icon {
	border: 2px solid var(--border-color);
	border-radius: 50%;
}
.leaflet-marker-icon {
	cursor: grab;
}

.guessBtn__wrapper {
	position: absolute;
	width: 40%;
	left: 50%;
	transform: translate(-50%);
	bottom: 0.5rem;
}
.guessBtn {
	color: #000;
	font-size: 1.2rem;
	border-radius: 9px;
	background: #42dfba;
	width: 100%;
	padding: 1rem;
}

button.cooldown {
	outline: none;
	overflow: hidden;
}

button.cooldown:active,
button.cooldown:focus {
	outline: none;
}
button.cooldown:disabled {
	background: rgba(0, 0, 0, 0.3);
	cursor: not-allowed;
	box-shadow: inset 3px 3px 10px 0px rgba(0, 0, 0, 0.2);
}

button.cooldown:disabled:after {
	content: "";
	position: absolute;
	bottom: 0;
	width: 100%;
	left: 0;
	height: 5px;
	background: #1a334d;
	-webkit-animation: cooldown 5s linear;
	animation: cooldown 5s linear;
}

.toasted-container.bottom-center {
	bottom: 4.5rem;
}

/* Color Picker */
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
	outline: 2px solid var(--border-color);
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

@-webkit-keyframes cooldown {
	0% {
		width: 100%;
	}
	100% {
		width: 0;
	}
}

@keyframes cooldown {
	0% {
		width: 100%;
	}
	100% {
		width: 0;
	}
}
</style>

<template>
	<div>
		<div class="fixed top header">
			<Logo :subtitle="bot" />
			<div v-if="isLoggedIn" class="flex twitch__section">
				<img :src="userData.profile_image_url" alt="Avatar" class="avatar" />
				<h4>{{ userData.display_name }}</h4>
				<button v-if="isLoggedIn" class="btn twitchLoginBtn" @click="handleTwitchLogout()">Logout</button>
			</div>
			<button v-else class="btn twitchLoginBtn" @click="handleTwitchLogin()"><img src="~/assets/twitch-icon.svg" /> Login</button>
		</div>
		<div id="map"></div>
		<div class="flex guessBtn__wrapper">
			<!-- v-if="bot && isLoggedIn && twitchJSConnected" -->
			<button class="btn cooldown guessBtn" :disabled="disabled" title="(SPACE)" alt="Guess Button" @click="handleGuess()">GUESS</button>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			bot: "",
			map: {},
			customMarker: {},
			userData: {},
			isLoggedIn: false,
			twitchJSConnected: false,
			chat: {},
			coords: { lat: 0, lng: 0 },
			disabled: false,
		};
	},
	head() {
		return {
			title: `ChatGuessr ${this.bot ? ` - ${this.bot} map` : ""}`,
			link: [{ rel: "stylesheet", href: "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" }],
			script: [
				{
					hid: "leaflet",
					src: "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js",
				},
				{
					hid: "twitchJs",
					src: "https://unpkg.com/twitch-js@2.0.0-beta.33/dist/twitch.js",
					defer: true,
				},
			],
		};
	},

	async mounted() {
		// CHECK BOT IN PARAMS
		const params = Object.keys(this.$route.query);
		if (params.includes("bot")) {
			this.bot = this.$route.query.bot;
		} else {
			this.bot = this.$route.params.bot;
		}

		await axios
			.get("/api/auth/twitch/user")
			.then((res) => {
				this.isLoggedIn = true;
				this.userData = res.data;
				this.twitchJSConnect(res.data.access_token, res.data.login);
			})
			// IF ERROR TRY TO REFRESH TOKEN
			.catch(async (e) => {
				await axios
					.get("/api/auth/twitch/refreshtoken")
					.then(async () => {
						await axios
							.get("/api/auth/twitch/user")
							.then((res) => {
								this.isLoggedIn = true;
								this.userData = res.data;
								this.twitchJSConnect(res.data.access_token, res.data.login);
							})
							.catch((e) => {});
					})
					.catch((e) => {});
			});

		this.initMap();

		document.addEventListener("keydown", (e) => {
			if (e.code === "Space") {
				e.preventDefault();
				this.handleGuess();
			}
		});
	},
	methods: {
		twitchJSConnect: function (token, username) {
			this.chat = new window.TwitchJs({ token, username }).chat;
			this.chat
				.connect()
				.then((globalUserState) => {
					this.twitchJSConnected = true;
					this.$toast.success(`Connected as ${globalUserState.tags.displayName}`, { duration: 4000 });
				})
				.catch((e) => {
					this.$toast.error("Failed to connect to chat", { duration: 5000 });
					console.log("🚀 ~ error", e);
				});
		},
		handleTwitchLogin: function () {
			window.location.href = "/api/auth/twitch/login";
		},
		handleTwitchLogout: function () {
			axios.post("/api/auth/twitch/logout").then(() => {
				this.isLoggedIn = false;
				this.map.removeLayer(this.customMarker);
				this.$toast.success("Successfully logged out", { duration: 4000 });
			});
		},
		initMap: function () {
			const self = this;
			const layers = {
				roadmap: L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=en", {
					minZoom: 2,
					maxZoom: 21,
					subdomains: ["mt0", "mt1", "mt2", "mt3"],
					type: "roadmap",
				}),

				hybrid: L.tileLayer("https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}&hl=en", {
					minZoom: 2,
					maxZoom: 20,
					subdomains: ["mt0", "mt1", "mt2", "mt3"],
					type: "hybrid",
				}),

				terrain: L.tileLayer("https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}&hl=en", {
					minZoom: 2,
					maxZoom: 20,
					subdomains: ["mt0", "mt1", "mt2", "mt3"],
					type: "terrain",
				}),

				openTopoMap: L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
					minZoom: 2,
					maxZoom: 19,
					type: "openTopoMap",
				}),

				esriTopographic: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
					minZoom: 2,
					maxZoom: 19,
					type: "esriTopographic",
				}),
			};

			// Init Map
			const mapOptions = {
				attributionControl: false,
				center: [0, 0],
				zoom: 2,
				zoomControl: false,
			};

			this.map = L.map("map", mapOptions);
			getMapLayer().addTo(this.map);

			function getMapLayer() {
				const cBaseMap = self.getCookie("mapLayer");
				if (cBaseMap != "") {
					const layer = layers[cBaseMap];
					if (!layer) {
						return layers["roadmap"];
					} else {
						return layer;
					}
				} else {
					return layers["roadmap"];
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
				self.setCookie("mapLayer", baseMap, 30);
			}

			if (this.bot) {
				if (this.isLoggedIn) {
					const markerAvatar = L.icon({
						iconUrl: this.userData.profile_image_url,
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

				if (this.isLoggedIn) {
					this.customMarker.setLatLng(e.latlng);
				} else {
					L.popup().setLatLng(e.latlng).setContent(`${command}<br><span class="copy">Copied to clipboard</span><br>`).openOn(this.map);
				}
			});
		},
		handleGuess: function () {
			if (this.disabled) return;

			this.chat
				.whisper(this.bot, `!g ${this.coords.lat}, ${this.coords.lng}`)
				.then((res) => {
					this.triggerCoolDown();
					this.$toast.success(`Guess successfully sent to ${this.bot} !`, { duration: 3000 });
				})
				.catch((e) => {
					console.log("🚀 ~ error", e);
					this.$toast.error("Something went wrong", { duration: 4000 });
				});
		},
		triggerCoolDown: function () {
			new Promise((resolve, reject) => {
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
		// COOKIES
		getCookie: function (name) {
			const cname = name + "=";
			const decodedCookie = decodeURIComponent(document.cookie);
			const ca = decodedCookie.split(";");
			for (let i = 0; i < ca.length; i++) {
				let c = ca[i];
				while (c.charAt(0) == " ") {
					c = c.substring(1);
				}
				if (c.indexOf(cname) == 0) {
					return c.substring(cname.length, c.length);
				}
			}
			return "";
		},
		setCookie: function (name, value, exdays) {
			const d = new Date();
			d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
			const expires = "expires=" + d.toUTCString();
			document.cookie = name + "=" + value + ";" + expires + ";path=/";
		},
	},
};
</script>

<style>
* {
	margin: 0;
}
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
	background: rgba(0, 0, 0, 0.1);
	z-index: 99;
}
.twitch__section {
	margin-left: auto;
	justify-content: space-around;
	overflow: hidden;
	text-overflow: ellipsis;
	grid-gap: 0.7rem;
}
.twitchLoginBtn {
	height: 45px;
	background: #815fc0;
}
.avatar {
	vertical-align: middle;
	width: 40px;
	height: 40px;
}
.avatar,
.leaflet-marker-icon {
	border: 2px solid var(--clr-primary);
	border-radius: 50%;
}
.leaflet-marker-icon {
	cursor: grab;
}

.guessBtn__wrapper {
	left: 50%;
	transform: translate(-50%);
	position: absolute;
	width: 60%;
	bottom: 0.5rem;
}
.guessBtn {
	color: #000;
	font-size: 1.2rem;
	background: var(--clr-primary);
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

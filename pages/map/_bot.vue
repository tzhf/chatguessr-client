<template>
	<div>
		<Logo :subtitle="bot" />
		<div id="map"></div>
	</div>
</template>

<script>
export default {
	head() {
		return {
			title: `ChatGuessr locpicker${this.bot ? ` - ${this.bot}` : ""}`,
		};
	},
	data() {
		return {
			bot: "",
		};
	},
	mounted() {
		const params = Object.keys(this.$route.query);
		if (params.includes("bot")) {
			this.bot = this.$route.query.bot;
		} else {
			this.bot = this.$route.params.bot;
		}
		const $Scriptjs = require("scriptjs");
		$Scriptjs("https://unpkg.com/leaflet@1.7.1/dist/leaflet.js", () => {
			this.initMap();
		});
	},
	methods: {
		initMap: function() {
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

			const map = L.map("map", mapOptions);
			getMapLayer().addTo(map);

			function getMapLayer() {
				const cBaseMap = getCookie("mapLayer");
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
			L.control.layers({ ...layers }, {}, { position: "topright", collapsed: false }).addTo(map);
			L.control.zoom({ position: "bottomright" }).addTo(map);

			map.on("baselayerchange", onBaseLayerChange);

			function onBaseLayerChange() {
				const id = event.currentTarget.layerId;
				const layer = this._layers[id];
				const baseMap = layer.options.type;
				setCookie("mapLayer", baseMap, 30);
			}

			// Popup window
			const popup = L.popup().setLatLng([0, 0]);

			if (!this.bot) {
				popup.setContent(`Please fill your bot in the url parameters`).openOn(map);
			} else {
				popup.setContent(`Click on the map to make your guess`).openOn(map);
			}

			map.on("click", (e) => {
				if (!this.bot) {
					L.popup()
						.setLatLng(e.latlng)
						.setContent(`Please fill your bot in the url parameters`)
						.openOn(map);
				} else {
					const coords = map.wrapLatLng(e.latlng);
					const content = `/w ${this.bot} !g ${coords.lat}, ${coords.lng}`;
					L.popup()
						.setLatLng(e.latlng)
						.setContent(`${content}<br><span class="copy">Copied to clipboard</span><br>`)
						.openOn(map);
					copyToClipboard(content);
				}
			});

			// Copy to clipboard
			function copyToClipboard(str) {
				const el = document.createElement("textarea");
				el.value = str;
				el.setAttribute("readonly", "");
				el.style = { position: "absolute", left: "-9999px" };
				document.body.appendChild(el);

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
			}

			// Cookies
			function setCookie(name, value, exdays) {
				const d = new Date();
				d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
				const expires = "expires=" + d.toUTCString();
				document.cookie = name + "=" + value + ";" + expires + ";path=/";
			}

			function getCookie(name) {
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
			}
		},
	},
};
</script>

<style>
@import url("https://unpkg.com/leaflet@1.7.1/dist/leaflet.css");
* {
	margin: 0;
}
#map {
	z-index: 0;
	height: 100vh;
}

@media only screen and (max-width: 400px) {
	.leaflet-top {
		margin-top: 55px;
	}
}
.leaflet-control-layers {
	background-color: rgba(0, 0, 0, 0.6) !important;
	color: rgb(255, 255, 255);
	font-size: 1.2em;
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
	border: 0;
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
</style>

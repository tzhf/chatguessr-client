interface Stream {
    broadcaster_login: string;
    display_name: string;
    title: string;
}
type Streams = Stream[] | null;

interface Contributor {
    html_url: string;
    login: string;
    avatar_url: string;
}
type Contributors = Contributor[] | null;

interface hsl {
    hue: number;
    saturation: number;
    luminosity: number;
}

interface Layers {
    [key: string]: L.TileLayer;
}

interface Location {
    lat: number;
    lng: number;
    panoId?: string;
    heading: number;
    pitch: number;
    zoom: number;
}

interface LatLng {
    lat: number;
    lng: number;
}

interface Mode {
    noMove: boolean;
    noPan: boolean;
    noZoom: boolean;
}

interface Game {
    code: string;
    streamer: string;
    map: string;
    mode: Mode;
    locations: Location[];
    players: PlayerResult[];
}

interface PlayerResult {
    username: string;
    color: string;
    flag: string;
    streak: number;
    guesses: (LatLng | null)[];
    scores: (number | null)[];
    distances: (number | null)[];
    totalScore: number;
    totalDistance: number;
    score: number;
    distance: number;
    rounds: number;
}

interface TileLayerOptions extends L.TileLayerOptions {
    title: string;
}

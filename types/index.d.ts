interface Stream {
  title: string
  userName: string
  userDisplayName: string
  profilePictureUrl: string
}
type Streams = Stream[] | null

interface hsl {
  hue: number
  saturation: number
  luminosity: number
}

interface Layers {
  [key: string]: L.TileLayer
}

interface Location {
  lat: number
  lng: number
  panoId?: string
  heading: number
  pitch: number
  zoom: number
}

interface LatLng {
  lat: number
  lng: number
}

interface Mode {
  noMove: boolean
  noPan: boolean
  noZoom: boolean
}

interface Game {
  code: string
  streamer: string
  map: string
  mode: Mode
  locations: Location[]
  players: PlayerResult[]
}

interface PlayerResult {
  player: Player
  guesses: (LatLng | null)[]
  scores: (number | null)[]
  distances: (number | null)[]
  totalScore: number
  totalDistance: number
}

interface OldPlayerResult {
  username: string
  avatar: string | null
  color: string
  flag: string
  streak: number
  guesses: (LatLng | null)[]
  scores: (number | null)[]
  distances: (number | null)[]
  totalScore: number
  totalDistance: number
}

interface Player {
  username: string
  avatar: string | null
  color: string
  flag: string
  streak: number
}

interface TileLayerOptions extends L.TileLayerOptions {
  title: string
}

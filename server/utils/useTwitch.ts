// Define the type for the Twitch Access Token response
interface TwitchAccessTokenResponse {
  access_token: string
  expires_in: number
  token_type: string
}

// Define the generic response type for Twitch API responses
interface TwitchAPIResponse<T> {
  data: T[]
}

export default function useTwitch() {
  const config = useRuntimeConfig()
  const clientId = config.TWITCH_CLIENT_ID as string // Replace with your Twitch Client ID
  const clientSecret = config.TWITCH_CLIENT_SECRET as string // Replace with your Twitch Client Secret
  const baseUrl = 'https://api.twitch.tv/helix'

  // Function to get an App Access Token
  const getAccessToken = async (): Promise<string> => {
    const url = 'https://id.twitch.tv/oauth2/token'
    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    })

    const response = await $fetch<TwitchAccessTokenResponse>(`${url}?${params.toString()}`, {
      method: 'POST',
    })
    return response.access_token
  }

  // Function to fetch data from the Twitch API
  const fetchFromTwitch = async <T>(
    endpoint: string,
    params: Record<string, string | number> = {}
  ): Promise<TwitchAPIResponse<T>> => {
    const accessToken = await getAccessToken()
    const urlParams = new URLSearchParams(params as Record<string, string>)

    const response = await $fetch<TwitchAPIResponse<T>>(`${baseUrl}/${endpoint}?${urlParams.toString()}`, {
      headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return response
  }

  // Public API
  return { fetchFromTwitch }
}

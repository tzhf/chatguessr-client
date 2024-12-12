interface TwitchStream {
  id: string
  user_id: string
  user_name: string
  title: string
  game_id: string
  viewer_count: number
  started_at: string
  language: string
}

interface TwitchUser {
  id: string
  login: string
  display_name: string
  profile_image_url: string
}

interface TwitchStreamsResponse {
  data: TwitchStream[]
}

interface TwitchUsersResponse {
  data: TwitchUser[]
}

export default defineEventHandler(async () => {
  const twitch = useTwitch()

  try {
    // Fetch streams for a specific game ID and limit
    const response: TwitchStreamsResponse = await twitch.fetchFromTwitch('streams', {
      game_id: '369418', // GeoGuessr game ID
      first: 100,
    })

    const streams = response.data

    // Filter streams and fetch user profile picture for each
    const filteredStreams = await Promise.all(
      streams
        .filter((stream) => stream.title.toLowerCase().includes('cg') || stream.title.toLowerCase().includes('hatguessr'))
        .map(async (stream) => {
          const userResponse: TwitchUsersResponse = await twitch.fetchFromTwitch('users', { id: stream.user_id })
          const user = userResponse.data[0]

          return {
            title: stream.title,
            userName: stream.user_name,
            userDisplayName: stream.user_name,
            profilePictureUrl: user.profile_image_url,
          } as Stream
        })
    )

    return filteredStreams
  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message || 'Failed to fetch streams',
    })
  }
})

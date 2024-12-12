interface TwitchUser {
  id: string
  login: string
  display_name: string
  type: string
  broadcaster_type: string
  description: string
  profile_image_url: string
  offline_image_url: string
  view_count: number
  created_at: string
}

interface TwitchUsersResponse {
  data: TwitchUser[]
}

export default defineEventHandler(async (event) => {
  const name = event.context.params?.name // Get the channel name from query params
  if (!name) {
    throw createError({ statusCode: 400, statusMessage: 'Channel name is required.' })
  }

  const twitch = useTwitch()

  try {
    const data = (await twitch.fetchFromTwitch('users', { login: name })) as TwitchUsersResponse
    if (!data.data || data.data.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Channel not found.' })
    }

    // Return only the profile picture URL
    return { avatar: data.data[0].profile_image_url }
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch channel data.' })
  }
})

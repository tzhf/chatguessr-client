interface TwitchUser {
  id: string
  login: string
  display_name: string
  profile_image_url: string
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
    // Fetch user data based on the channel name
    const data = await twitch.fetchFromTwitch<TwitchUsersResponse>('users', { login: name })

    // If no user data is found, throw an error
    if (!data || !data.data || data.data.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'Channel not found.' })
    }

    // Return the profile picture URL
    return { avatar: data.data[0].profile_image_url }
  } catch (error) {
    console.error('Error fetching channel data:', error)

    // Handle different types of errors
    if (error.response && error.response.status === 404) {
      throw createError({ statusCode: 404, statusMessage: 'Channel not found.' })
    }

    // Generic error handling for failed API calls
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to fetch channel data.',
    })
  }
})

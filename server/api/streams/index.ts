const twitch = useTwitch()

export default defineEventHandler(async () => {
  return await twitch.streams
    .getStreams({ game: '369418', limit: 100 })
    .then(async (res) => {
      const streams = res.data
        .filter((stream) => stream.title.toLowerCase().includes('cg') || stream.title.toLowerCase().includes('hatguessr'))
        .map(async (stream) => {
          return {
            title: stream.title,
            userName: stream.userName,
            userDisplayName: stream.userDisplayName,
            profilePictureUrl: await stream.getUser().then((user) => user.profilePictureUrl),
          } as Stream
        })

      return await Promise.all(streams)
    })
    .catch((error) => {
      throw createError({
        statusCode: 400,
        statusMessage: error,
      })
    })
})

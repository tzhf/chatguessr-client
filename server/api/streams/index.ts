const twitch = useTwitch();

export default defineEventHandler(async () => {
    return twitch.streams
        .getStreams({ game: "369418", limit: 100 })
        .then((res) => {
            return res.data
                .filter(
                    (stream) =>
                        stream.title.toLowerCase().includes("cg") || stream.title.toLowerCase().includes("hatguessr")
                )
                .map((stream) => {
                    return {
                        broadcaster_login: stream.userName,
                        display_name: stream.userDisplayName,
                        title: stream.title,
                    };
                });
        })
        .catch((error) => {
            throw createError({
                statusCode: 400,
                statusMessage: error,
            });
        });
});

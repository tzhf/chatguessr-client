const twitch = useTwitch();

export default defineEventHandler(async (event) => {
    const name = event.context.params?.name;
    if (!name) {
        throw createError({
            statusCode: 404,
            statusMessage: "Please provide a channel name",
        });
    }

    const user = await twitch.users.getUserByName(name);
    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: "User not found",
        });
    }

    return { avatar: user.profilePictureUrl };
});

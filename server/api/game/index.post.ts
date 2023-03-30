// @ts-ignore
import hrrs from "human-readable-random-string";

const client = useSupabase();

export default defineEventHandler(async (event) => {
    const { access_token } = getHeaders(event);
    const body = await readBody(event);

    if (!access_token || typeof access_token != "string") {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
        });
    }

    const { error: err, data: user } = await client.auth.getUser(access_token);

    if (err) {
        throw createError({
            statusCode: err.status,
            statusMessage: err.message,
        });
    }

    if (!user.user) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
        });
    }

    const code = hrrs(12);

    const { error } = await client.from("game").insert({
        code: code,
        streamer: body.streamer,
        map: body.map,
        mode: body.mode,
        locations: body.locations,
        players: body.players,
    });

    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message,
        });
    }

    return { code: code };
});

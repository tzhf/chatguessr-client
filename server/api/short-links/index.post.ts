// @ts-ignore
import hrrs from "human-readable-random-string";

const client = useSupabase();

export default defineEventHandler(async (event) => {
    const { longUrl } = await readBody(event);

    if (!longUrl || !longUrl.startsWith("https://www.google.com/maps/") || !URL.canParse(longUrl)) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad request",
        });
    }
    const { data } = await client.from("short-links").select("code").eq("long_url", longUrl).limit(1).single();

    if (!data) {
        const code = hrrs(8);

        const { error } = await client.from("short-links").insert({
            code: code,
            long_url: longUrl,
        });

        if (error) {
            throw createError({
                statusCode: 500,
                statusMessage: error.message,
            });
        }

        return { code: code };
    } else {
        return { code: data.code };
    }
});

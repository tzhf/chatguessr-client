const client = useSupabase();

// Redirect route for short gmaps links
export default defineEventHandler(async (event) => {
    const code = getRouterParam(event, "code");
    if (!code) {
        return await sendRedirect(event, "/", 200);
    }

    const { data } = await client.from("short-links").select("*").eq("code", code).limit(1).single();
    return data ? await sendRedirect(event, data.long_url, 200) : await sendRedirect(event, "/", 200);
});

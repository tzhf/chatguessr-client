import { StaticAuthProvider } from "@twurple/auth";
import { ApiClient } from "@twurple/api";

export default function useTwitch() {
    const config = useRuntimeConfig();
    const authProvider = new StaticAuthProvider(config.TWITCH_CLIENT_ID, config.TWITCH_OAUTH);

    return new ApiClient({
        authProvider,
    });
}

import type { Config } from "tailwindcss";

export default <Partial<Config>>{
    theme: {
        extend: {
            fontSize: {
                xxs: "0.7rem",
                xs: "0.875rem",
                base: "14px",
            },
            colors: {
                primary: "#42dfba",
                "zinc-700": "#292929",
            },
        },
    },
};

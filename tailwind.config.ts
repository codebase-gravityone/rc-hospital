import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                "scroll-carousel": {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(calc(-50% - 12px))" },
                },
            },
            animation: {
                "scroll-carousel": "scroll-carousel 40s linear infinite",
            },
        },
    },
    plugins: [],
};

export default config;

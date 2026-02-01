import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                obsidian: "var(--bg-obsidian)",
                charcoal: "var(--bg-charcoal)",
                chrome: "var(--accent-chrome)",
                indigo: {
                    DEFAULT: "var(--accent-indigo)",
                    plasma: "var(--accent-plasma)",
                },
                surface: {
                    dark: "var(--bg-charcoal)",
                    card: "var(--glass-bg)",
                }
            },
            fontFamily: {
                heading: ["var(--font-heading)", "sans-serif"],
                body: ["var(--font-body)", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
            animation: {
                "spin-slow": "spin 8s linear infinite",
            }
        },
    },
    plugins: [],
} satisfies Config;

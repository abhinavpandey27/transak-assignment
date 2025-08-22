import type { Config } from "tailwindcss";

const font = (sizeVar: string, lhVar: string, trackVar: string, weight?: number | string) => [
  `var(${sizeVar})`,
  { lineHeight: `var(${lhVar})`, letterSpacing: `var(${trackVar})`, fontWeight: weight ?? "400" },
];

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Instrument Sans", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        /* Titles */
        "title-1": font("--title-1", "--title-1-lh", "--title-1-track", 600),
        "title-2": font("--title-2", "--title-2-lh", "--title-2-track", 600),
        "title-3": font("--title-3", "--title-3-lh", "--title-3-track", 600),

        /* Headings */
        h1: font("--h1", "--h1-lh", "--h1-track", 600),
        h2: font("--h2", "--h2-lh", "--h2-track", 600),
        h3: font("--h3", "--h3-lh", "--h3-track", 600),
        h4: font("--h4", "--h4-lh", "--h4-track", 600),

        /* Labels */
        "label-1": font("--label-1", "--label-1-lh", "--label-1-track"),
        "label-2": font("--label-2", "--label-2-lh", "--label-2-track"),
        "label-3": font("--label-3", "--label-3-lh", "--label-3-track"),

        /* Body */
        "body-1": font("--body-1", "--body-1-lh", "--body-1-track"),
        "body-2": font("--body-2", "--body-2-lh", "--body-2-track"),
        "body-3": font("--body-3", "--body-3-lh", "--body-3-track"),

        /* Tiny & Micro */
        tiny: font("--tiny", "--tiny-lh", "--tiny-track", 500),
        "tiny-extended": font("--tiny-extended", "--tiny-extended-lh", "--tiny-extended-track", 500),
        micro: font("--micro", "--micro-lh", "--micro-track", 600),
      },
    },
  },
  plugins: [],
} satisfies Config;

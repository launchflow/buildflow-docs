module.exports = {
  corePlugins: {
    preflight: false, // disable Tailwind's reset
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'], // hooks into docusaurus' dark mode settings
  theme: {
    extend: {
      keyframes: {
        scale_md: {
          "0%": { transform: "scale(1.0)" },
          "25%": { transform: "scale(1.5)" },
          "50%": { transform: "scale(1.5)" },
          "75%": { transform: "scale(1.0)" },
          "100%": { transform: "scale(1.0)" },
        },
        scale_lg: {
          "0%": { transform: "scale(1.0)" },
          "25%": { transform: "scale(2.0)" },
          "50%": { transform: "scale(2.0)" },
          "75%": { transform: "scale(1.0)" },
          "100%": { transform: "scale(1.0)" },
        },
      },
      animation: {
        "scale-md": "scale_md 12s ease-in-out infinite",
        "scale-lg": "scale_lg 12s ease-in-out 4s infinite",
        "scale-md-delay": "scale_md 12s ease-in-out 2s infinite",
      },
    },
  },
  plugins: [],
};

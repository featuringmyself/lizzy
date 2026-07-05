/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        jungle: {
          primary: "#1B4332",
          light: "#40916C",
          accent: "#FCD34D",
          coral: "#FF6B6B",
          cream: "#FFF8E7",
          leaf: "#D8F3DC",
        },
        desert: {
          primary: "#BC6C25",
          light: "#E9C46A",
          accent: "#F4A261",
          coral: "#E76F51",
        },
        urban: {
          primary: "#1D3557",
          light: "#457B9D",
          accent: "#06D6A0",
          coral: "#EF476F",
        },
        ink: "#1A1A2E",
      },
      fontFamily: {
        nunito: ["Nunito_600SemiBold"],
        "nunito-bold": ["Nunito_700Bold"],
        "nunito-extrabold": ["Nunito_800ExtraBold"],
      },
      borderRadius: {
        card: "24px",
        button: "16px",
      },
    },
  },
  plugins: [],
};

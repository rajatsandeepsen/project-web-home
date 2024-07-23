/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(235.56deg, rgba(174, 106, 242, 0.6) 10.86%, rgba(62, 61, 140, 0.6) 89.87%)",
      },
      content: {
        searchIcon: 'url("/src/assets/icons/search.png")',
      },
    },
  },
  plugins: [],
};

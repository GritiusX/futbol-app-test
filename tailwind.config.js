/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			xs: "480px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
			"3xl": "1790px",
		},
		extend: {
			colors: {
				sandy: "#F4A261",
				sienna: "#E76F51",
				saffron: "#E9C46A",
				persian: "#2A9D8F",
				charcoal: "#264653",
				night: "#121416",
				gunmetal: "#2E3338",
				dayWhite: "#F0F7EE",
			},
			transitionProperty: {
				height: "height",
			},
		},
	},
	plugins: [],
};

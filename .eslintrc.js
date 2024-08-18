// https://docs.expo.dev/guides/using-eslint/
module.exports = {
	extends: ["expo", "prettier"],
	plugins: ["prettier"],
	rules: {
		"prettier/prettier": [
			"error",
			{
				singleQuote: false,
				useTabs: true,
				parser: "flow",
				tabWidth: 2,
				semi: false,
				bracketSpacing: true,
				htmlWhitespaceSensitivity: "ignore",
				endOfLine: "auto",
			},
		],
	},
}

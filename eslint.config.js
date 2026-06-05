export default [
	{
		files: ["connector.js"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "script",
			globals: {
				window: "readonly",
				document: "readonly",
				WebSocket: "readonly",
				MozWebSocket: "readonly",
				location: "readonly",
				console: "readonly",
				JSON: "readonly"
			}
		}
	}
];

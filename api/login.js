const { Router } = require("express");
const router = Router();

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const BASE_URL = process.env.BASE_URL;

router.use("/auth/twitch/login", (req, res) => {
	const URL = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${TWITCH_CLIENT_ID}&redirect_uri=https://${BASE_URL}/api/auth/twitch/callback&scope=chat:read whispers:edit`;
	const { referer } = req.headers;
	const state = Buffer.from(JSON.stringify({ referer })).toString("base64");

	res.redirect(URL + `&state=${state}`);
});

module.exports = router;

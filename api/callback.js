const { Router } = require("express");
const router = Router();

const axios = require("axios");
const CryptoJS = require("crypto-js");

const PASSPHRASE = process.env.PASSPHRASE;
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const BASE_URL = process.env.BASE_URL;

router.use("/auth/twitch/callback", (req, res) => {
	const code = req.query.code;
	const state = req.query.state;

	if (code) {
		const URL = `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=https://${BASE_URL}/api/auth/twitch/callback`;

		axios(URL, { method: "POST" })
			.then((response) => {
				const encrypted = CryptoJS.AES.encrypt(
					JSON.stringify({ access_token: response.data.access_token, refresh_token: response.data.refresh_token }),
					PASSPHRASE
				).toString();

				res.cookie("connectID", encrypted, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 364 });

				const referer = JSON.parse(Buffer.from(state, "base64").toString("ascii"));
				if (referer) {
					res.redirect(referer.referer);
				} else {
					res.redirect("/map");
				}
			})
			.catch((e) => {
				console.log(e);
				res.send("something went wrong", e);
			});
	} else {
		res.send("no code provided");
	}
});

module.exports = router;

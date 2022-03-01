const { Router } = require("express");
const router = Router();
const axios = require("axios");

const CryptoJS = require("crypto-js");
const PASSPHRASE = process.env.PASSPHRASE;

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

router.use("/auth/twitch/refreshtoken", (req, res) => {
	if (req.cookies?.connectID) {
		const bytes = CryptoJS.AES.decrypt(req.cookies.connectID, PASSPHRASE);
		const refresh_token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).refresh_token;

		axios
			.post("https://id.twitch.tv/oauth2/token", null, {
				params: {
					grant_type: "refresh_token",
					refresh_token: refresh_token,
					client_id: TWITCH_CLIENT_ID,
					client_secret: TWITCH_CLIENT_SECRET,
				},
			})
			.then((response) => {
				if (response.status == 200) {
					const encrypted = CryptoJS.AES.encrypt(
						JSON.stringify({ access_token: response.data.access_token, refresh_token: refresh_token }),
						PASSPHRASE
					).toString();

					res.cookie("connectID", encrypted, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 364 });
					res.sendStatus(200);
				}
			})
			.catch((e) => {
				res.status(401).send("Something went wrong");
				console.log(e);
			});
	} else {
		res.status(401).send("UNAUTHORIZED");
	}
});

module.exports = router;

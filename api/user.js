const { Router } = require("express");
const router = Router();
const axios = require("axios");

const CryptoJS = require("crypto-js");
const PASSPHRASE = process.env.PASSPHRASE;

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;

router.use("/auth/twitch/user", (req, res) => {
	if (req.cookies?.connectID) {
		const bytes = CryptoJS.AES.decrypt(req.cookies.connectID, PASSPHRASE);
		const access_token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).access_token;

		const options = {
			url: "https://api.twitch.tv/helix/users",
			method: "GET",
			headers: {
				"Client-ID": TWITCH_CLIENT_ID,
				Accept: "application/vnd.twitchtv.v5+json",
				Authorization: "Bearer " + access_token,
			},
		};

		axios(options)
			.then((response) => {
				if (response.status == 200) {
					res.status(200).send({ ...response.data.data[0], access_token });
				} else {
					res.status(401).send("UNAUTHORIZED");
				}
			})
			.catch((e) => {
				res.status(401).send("UNAUTHORIZED");
				console.log(e);
			});
	} else {
		res.status(401).send("UNAUTHORIZED");
	}
});

module.exports = router;

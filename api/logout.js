const { Router } = require("express");
const router = Router();

router.use("/auth/twitch/logout", (req, res) => {
	res.clearCookie("connectID");
	res.status(200).send("Successfully logged out");
});

module.exports = router;

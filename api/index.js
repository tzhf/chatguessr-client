const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

const twitchLogin = require("./login");
const twitchLogout = require("./logout");
const twitchCallback = require("./callback");
const refreshToken = require("./refreshtoken");
const user = require("./user");

app.use(twitchLogin);
app.use(twitchLogout);
app.use(twitchCallback);
app.use(refreshToken);
app.use(user);

if (require.main === module) {
	const port = 3001;
	app.listen(port, () => {
		console.log(`API server listening on port ${port}`);
	});
}

module.exports = app;

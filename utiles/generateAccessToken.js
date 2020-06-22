const jwt = require("jsonwebtoken");
require("dotenv/config");

const generateAccessToken = data => {
	return jwt.sign({ userID: data }, process.env.ACCESS_TOKEN, {
		expiresIn: "70s",
	});
};

module.exports.generateAccessToken = generateAccessToken;

const jwt = require("jsonwebtoken");
require("dotenv/config");


const generateAccessToken = data => {
	return jwt.sign({ userID: data }, process.env.ACCESS_TOKEN, {
		expiresIn: `${process.env.ACCESS_TOKEN_TIME}s`,
	});
};

module.exports.generateAccessToken = generateAccessToken;

const jwt = require("jsonwebtoken");
require("dotenv/config");

const generateToken = data => {
	return jwt.sign({"userID":data}, process.env.ACCESS_TOKEN, { expiresIn: "30s" });
};

module.exports.generateToken = generateToken;

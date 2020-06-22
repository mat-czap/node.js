const jwt = require("jsonwebtoken");
const Redis = require("ioredis");
const jwtDecode = require("jwt-decode");
const { generateAccessToken } = require("../utiles/generateAccessToken");
const redis = new Redis({ db: 0 });
const redisBlackList = new Redis({ db: 1 });

const sendToDb = data =>
	new Promise((resolve, reject) => {
		if (data == null) throw new Error("token has not been passed");
		redis.set(data, "");
		resolve("ok");
	});

const removeFromDb = data =>
	new Promise((resolve, reject) => {
		if (data == null) throw new Error("token has not been passed");
		redis.del(data);
		resolve("ok");
	});

const addToBlackList = data =>
	new Promise((resolve, reject) => {
		const timeToExpire = token => {
			const jwtDecoded = jwtDecode(token);
			var current_time = new Date().getTime() / 1000;
			if (jwtDecoded.exp < current_time) return false;
			return Math.trunc(jwtDecoded.exp - current_time);
		};

		const BlackListSet = data => {
			const time = timeToExpire(data);
			if (!time) return;
			redisBlackList.set(data, "", "EX", time);
		};

		BlackListSet(data);
		return resolve("ok");
	});

const checkIfKeyExists = data =>
	new Promise((resolve, reject) => {
		const key = redis.exists(data);
		resolve(key);
	});

const checkIfKeyExistsBlackList = data =>
	new Promise((resolve, reject) => {
		const key = redisBlackList.exists(data);
		resolve(key);
	});

const getAccessToken = async (req, res) => {
	// getting refreshJWT from req obj
	const refreshToken = req.body.token;
	//check if refreshJWT were passed
	if (refreshToken == null) return res.sendStatus(401);

	//check if refreshJWT is in RedidsDB
	const tokenInDB = await checkIfKeyExists(refreshToken);
	if (tokenInDB !== 1) return res.sendStatus(403);

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, { userID }) => {
		if (err) return res.sendStatus(403).send(err);
		const accessToken = generateAccessToken(userID);
		res.json({ newAccessToken: accessToken });
	});
};

module.exports.getAccessToken = getAccessToken;
module.exports.sendToDb = sendToDb;
module.exports.removeFromDb = removeFromDb;
module.exports.addToBlackList = addToBlackList;
module.exports.checkIfKeyExistsBlackList = checkIfKeyExistsBlackList;

const jwt = require("jsonwebtoken");
const Redis = require("ioredis");
const { generateAccessToken } = require("../utiles/generateAccessToken");
const redis = new Redis({ db: 0 });

const sendToDb = async data => new Promise((resolve,reject)=>{
	if (data == null) throw new Error("token has not been passed");

	const redisSet= async data => await redis.set(data,"") 

	try {
		redisSet(data)
		resolve("ok");
	} catch (err) {
		return reject(err);
	}
});

const removeFromDb = async data => new Promise((resolve) => {
	
	const RedisDel= async data => await redis.del(data) 
	
	try {
		RedisDel(data)
		resolve("ok");
	}
	catch (err) {
		reject(err);
	}
});

const checkIfKeyExists = async data => {
	try {
		const key = await redis.exists(data);
		return key == 1;
	} catch (err) {
		return err;
	}
};

const getAccessToken = async (req, res) => {
	// getting refreshJWT from req obj
	const refreshToken = req.body.token;
	//check if refreshJWT were passed
	if (refreshToken == null) return res.sendStatus(401);

	//check if refreshJWT is in RedidsDB
	const tokenInDB = await checkIfKeyExists(refreshToken);
	if (!tokenInDB) return res.sendStatus(403);

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, { userID }) => {
		if (err) return res.sendStatus(403).send(err);
		const accessToken = generateAccessToken(userID);
		res.json({ newAccessToken: accessToken });
	});
};

module.exports.getAccessToken = getAccessToken;
module.exports.sendToDb = sendToDb;
module.exports.removeFromDb = removeFromDb;

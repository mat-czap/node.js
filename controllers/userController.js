require("dotenv/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const User = require("../db/models/user");
const userTEST = require("../db/repositoryUser");
const {
	registerValidation,
	loginValidation,
} = require("../validations/UserValidate");
const { generateAccessToken } = require("../utiles/generateAccessToken");
const {
	sendToDb,
	removeFromDb,
	addToBlackList,
} = require("../controllers/tokenController");

const registerUser = async (req, res) => {
	// data validation
	try {
		registerValidation(req.body);
	} catch (err) {
		return res.status(400).send(err);
	}
	
	// REPO MONGO
	// checking if the email exists
	// const emailExist = await User.findOne({ email: req.body.email });
	// if (emailExist)
	// 	return res.status(400).send("passed email exists, please try different!");

	//check if the email exists REPO PATTERN
	try {
		const isEmailTaken = await userTEST.isEmailTaken(req.body.email);
		if (isEmailTaken)
			return res.status(400).send("passed email exists, please try different!");
	} catch (err) {
		return res.status(400).send(err.message);
	}

	//hash password
	const salt = await bcrypt.genSalt(10);
	const hashedpassword = await bcrypt.hash(req.body.password, salt);

	// create a new User
	const reqData = {
		name: req.body.name,
		email: req.body.email,
		password: hashedpassword,
		role: req.body.role,
	};
	try {
		// REPO MONGO
		// const newUser = await new User(reqData).save();
		// res.send({ userID: newUser._id });
		const newUser = await userTEST.addUser(reqData);
		res.send({ userID: newUser.id });
	} catch (err) {
		console.log(err);
	}
};

const loginUser = async (req, res) => {
	// login validation
	try {
		loginValidation(req.body);
	} catch (err) {
		console.log(err);
	}

	//REPO PATTERN

	// check if email exists
	const foundUser = await userTEST.getUserByEmail(req.body.email);
	if (!foundUser) return res.status(400).send("email is incorrect");
	// check if password is valid
	const validPass = await bcrypt.compare(req.body.password, foundUser.password);
	if (!validPass) return res.status(400).send("invalid password");
	//create token
	const accessToken = generateAccessToken(foundUser.id);
	const refreshToken = jwt.sign(
		{ userID: foundUser.id },
		process.env.REFRESH_TOKEN
	);

	//MONGO
	// check if email exists
	// const foundUser = await User.findOne({ email: req.body.email });
	// if (!foundUser) return res.status(400).send("email is incorrect");
	// // check if password is valid
	// const validPass = bcrypt.compare(req.body.password, foundUser.password);
	// if (!validPass) return res.status(400).send("invalid password");
	// //create token
	// const accessToken = generateAccessToken(foundUser._id);
	// const refreshToken = jwt.sign(
	// 	{ userID: foundUser._id },
	// 	process.env.REFRESH_TOKEN
	// );

	// storing refresh token in db
	sendToDb(refreshToken);
	// set refresh token in cookie for Client
	res.cookie("refreshToken", refreshToken, {
		expires: new Date(Date.now() + 900000000),
		httpOnly: true,
	});
	// pass accessToken for frontend
	res.json({ authorization: `Bearer ${accessToken}` });
};

const logoutUser = async (req, res) => {
	const RefreshToken = req.body.RefreshToken;
	const AccessToken = req.body.AccessToken;
	if (RefreshToken == null || undefined) return res.sendStatus(403);
	//toDo: condition for accessToken
	try {
		const dbCallBack = await removeFromDb(RefreshToken);
		const dbCallbackBlackList = await addToBlackList(AccessToken);
		if (dbCallBack === "ok" && dbCallbackBlackList === "ok")
			return res.sendStatus(204);
	} catch (err) {
		return res.send(err);
	}
};

async function getUserRole(req, res, next) {
	// getting token from header which equals eg. "Bearer 029309213".It's needed 2nd part.
	try {
		// const foundUser = await User.findOne({ _id: req.user });
		const foundUser = await userTEST.getUserById(req.user);
		req.userRole = foundUser.role;
		next();
	} catch (err) {
		if (err) return next(err);
	}
}

const authRole = role => {
	return (req, res, next) => {
		// if (req.userRole !== role[0]) {
		if (!role.includes(req.userRole)) {
			return next("route");
		}
		next();
	};
};

const showAllUsers = async (req, res) => {
	try {
		// const users = await User.find({});
		const users = await userTEST.showAllUsers();
		return res.json({ users: users });
	} catch (err) {
		return res.send(err);
	}
};

const showSingleUser = async (req, res) => {
	try {
		// const user = await User.find({ _id: req.user });
		const user = await userTEST.getUserById(req.user);
		return res.json({ user: user });
	} catch (err) {
		res.send(err);
	}
};

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.logoutUser = logoutUser;
module.exports.showSingleUser = showSingleUser;
module.exports.showAllUsers = showAllUsers;
module.exports.getUserRole = getUserRole;
module.exports.authRole = authRole;

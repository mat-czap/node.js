require("dotenv/config");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../db/models/user");
const {registerValidation, loginValidation} = require("../validations/UserValidate");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
	console.log(req.body.email)
	// data validation
	try {
		registerValidation(req.body);
	} catch (err) {
		return res.status(400).send(err);
	}
	//checking if the email exists
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist)
		return res.status(400).send("passed email exists, please try different!");

	//hash password
	const salt = await bcrypt.genSalt(10);
	const hashedpassword = await bcrypt.hash(req.body.password, salt);

	// create a new User
	const reqData = {
		name: req.body.name,
		email: req.body.email,
		password: hashedpassword,
	};

	try {
		const newUser = await new User(reqData).save();
		res.send({ userID: newUser._id });
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
	// check if email exists
	const foundUser = await User.findOne({ email: req.body.email });
	if (!foundUser) return res.status(400).send("email is wrong");
	// check if password if valid
	const validPass = bcrypt.compare(req.body.password, foundUser.password);
	if (!validPass) return res.status(400).send("invalid password");

	//create token 
	
	const token = jwt.sign({ UserID: foundUser._id }, process.env.SECRET_JWT)
	res.json({"authorization": token})
	

};

// const logoutUser = () => {
	
// }

// module.exports.logoutUser = logoutUser;
module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;

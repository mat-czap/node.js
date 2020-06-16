require("./db/mongoose");
require("dotenv/config");
const express = require("express");
const Redis = require("ioredis");
const User = require("./db/models/user");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const redis = new Redis({ db: 0 });
const redis1 = new Redis({ db: 1 });

const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

const app = express();
app.use(express.json());
const authRoute = require("./routes/auth");

const port = 3000;
app.listen(port);
app.set("view engine", "hbs");

// const permRoute = require("./routes/needPerm");
app.use("/api/auth", authRoute);
// app.use("/api/perm", permRoute);


// const userRoute = require("./routes/users");

app.use(morgan("combined"));
// registering routes
// app.use("/", userRoute);

redis.set("foo", "bar");
redis1.set("foo1", "bar1");


function timeToExpire (token) {
		const { user_id, iat, exp } = jwtDecode(token);
		const timeToExpire = exp - iat
		return timeToExpire;
};

const token1 = jwt.sign({ user_id: "asdmokds" }, process.env.SECRET_JWT, {
	expiresIn: "30s",
});

console.log(token1);
console.log(timeToExpire(token1));

const showScore = async () => {
	try {
		score = await redis.get("foo");
		score1 = await redis1.get("foo1");
	} catch (e) {
		console.log(e);
	}
	console.log("db0:", score, "db1:", score1);
};

showScore();

//model
//connect to db


// const findUsers = async () => {
// 	try {
// 		const users = await User.find({});
// 		console.log(users);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// const UsersCount = async () => {
// 	try {
// 		const users = await User.find({}).count();
// 		console.log(users);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// UsersCount()

// const UsersCount = async () => {
// 	try {
// 		const users = await User.deleteMany({ age: 21 });
// 		console.log(users);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// UsersCount();

// const createuser = async data => {
// 	try {
// 		const user = new User(data);
// 		await user.save();
// 		console.log(user);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// createuser({
// 	name: "Mateusz",
// 	age: 27,
// });

// mongoDb config
// const mongo = require('mongodb')
// const mongoClient = mongo.MongoClient
// const ObjectID = mongo.ObjectID
// const url = 'mongodb://127.0.0.1:27017'
// const dbname='Users'

// mongoClient.connect(url,{}, (err,client)=>{
//     if (err) {
//         console.log("err")
//     }
//     console.log("connection is running")

//     const db = client.db(dbname)

// db.collection('people').insertOne({firstname: "Łukasz", lastname:"Czaprański", zona:"Marta"},(err,result)=>{
//     if(err){
//         console.log("hello",err)
//     }
//     // console.log(result)
// })

// db.collection('people').find().t((err,users)=>{
//     console.log(users)
// })
// db.collection('people').updateOne({
//     firstname: "Łukasz"
// },{
//     $rename:
//         {"name":"zona"}

// })
// })

app.get("/", function (req, res) {
	res.render("index", {
		pageTitle: "Node jsssss",
		pageBody: "hello nodeeeee",
	});
});

app.get("/kontakt", function (req, res) {
	res.render("index", {
		pageTitle: "Node js konakt",
		pageBody: "hello node konakt",
	});
});

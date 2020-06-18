require("./db/mongoose");
require("dotenv/config");
const express = require("express");
const cors = require('cors')
const Redis = require("ioredis");
const User = require("./db/models/user");
const mongoose = require("mongoose");
const redis = new Redis({ db: 0 });
const redis1 = new Redis({ db: 1 });

const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

const app = express();
app.use(express.json());
app.use(cors())
const authRoute = require("./routes/auth");

const port = 3000;
app.listen(port);
app.set("view engine", "hbs");

const permRoute = require("./routes/needPerm");
app.use("/api/auth", authRoute);
app.use("/api/perm", permRoute);


app.use(morgan("combined"));
// registering routes
// app.use("/", userRoute);
// const userRoute = require("./routes/users");

// redis.set("foo", "bar");
// redis1.set("foo1", "bar1");




// const token1 = jwt.sign({ user_id: "asdmokds" }, process.env.ACCESS_TOKEN, {
// 	expiresIn: "30s",
// });

// console.log(token1);
// console.log(timeToExpire(token1));

const showScore = async () => {
	try {
		score = await redis.get("foo");
		score1 = await redis1.get("foo1");
	} catch (e) {
		console.log(e);
	}
	console.log("db0:", score, "db1:", score1);
};

// showScore();


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

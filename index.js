require("./db/mongooseConfig");
require("dotenv/config");
const authRoute = require("./routes/auth");
const protectedRoute = require("./routes/needPerm");
const express = require("express");
const morgan = require("morgan");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./SequelizeInit");

const app = express();

const port = process.env.PORT || 3000;
app.listen(port);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));


app.use("/api/auth", authRoute);
app.use("/api/perm", protectedRoute);

// db.sequelize.sync({ force: true });



const aaa = async ()=> {
    await db.sequelize.sync({ force: true })
    await db.users.create({name:"mat",email:"czap",password:"czap",role:"admin"})
    await db.users.create({name:"ads",email:"asddas",password:"asddas",role:"user"})
    // await db.passports.create({nazwa:"adssad", userId:1})


    const result_users = await db.users.findAll();
    console.log("All users:", JSON.stringify(result_users, null, 2));
}

aaa()


// app.set("view engine", "hbs");

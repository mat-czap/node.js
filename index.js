require("./db/mongoose");
require("dotenv/config");
const authRoute = require("./routes/auth");
const protectedRoute = require("./routes/needPerm");
const express = require("express");
const morgan = require("morgan");
var cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const port = 3000;
app.listen(port);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));

app.use("/api/auth", authRoute);
app.use("/api/perm", protectedRoute);

const dbPG = require("./SequelizeInit");
const aaa = async()=> {
    await dbPG.sync({ force: true }).then(() => {
        console.log("Drop and re-sync db.");
    });
    await dbPG.create({name:"ads",email:"asddas",password:"asddas"})
    await dbPG.create({name:"ads",email:"asddas",password:"asddas"})

    const users = await dbPG.findAll();
    console.log("All users:", JSON.stringify(users, null, 2));
    console.log(dbPG)
}

aaa()


app.set("view engine", "hbs");

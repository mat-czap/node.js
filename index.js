require("./db/mongoose");
require("dotenv/config");
const authRoute = require("./routes/auth");
const protectedRoute = require("./routes/needPerm");
const express = require("express");
const morgan = require("morgan");
var cookieParser = require('cookie-parser')
const cors = require("cors");

const app = express();

const port = 3000;
app.listen(port);

app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(morgan("combined"));

app.use("/api/auth", authRoute);
app.use("/api/perm", protectedRoute);

app.set("view engine", "hbs");

require('dotenv/config')
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});


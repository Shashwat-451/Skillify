const mongoose = require("mongoose");
require("dotenv").config();

// const { MONGODB_URL } = process.env;
// const MONGODB_URL  = "mongodb+srv://mishrashashwat985:xoCDPbMfeCBSAkP0@cluster0.dwuunpy.mongodb.net";


exports.connect = () => {
	mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};

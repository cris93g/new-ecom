require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const app = express();
const port = process.env.port || 3001;
const cors = require("cors");
const control = require("./ProductsController");

app.use(cors());
app.use(json());

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 100000
		}
	})
);

massive(process.env.CONNECTION_STRING).then(dbinstance => {
	app.set("db", dbinstance);
});
app.get("/api/test", (req, res, next) => {
	res.sendStatus(200);
});
app.post("/api/products", control.addToProducts);
app.listen(port, () => {
	console.log(`app is listening in port ${port}`);
});

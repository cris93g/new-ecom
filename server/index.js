require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const app = express();
const port = process.env.port || 3001;
const cors = require("cors");
const control = require("./controller/ProductsController");
const passport = require("passport");

app.use(cors());
app.use(json());
const { getUser, strat, logout } = require(`${__dirname}/controller/authCtrl`);
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

app.get("/api/test", (req, res, next) => {
	res.sendStatus(200);
});
massive(process.env.CONNECTION_STRING).then(dbinstance => {
	app.set("db", dbinstance);
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(strat);

passport.serializeUser((user, done) => {
	const db = app.get("db");
	db.getUserByAuthid([user.id])
		.then(response => {
			if (!response[0]) {
				db.addUserByAuthid([user.displayName, user.id, user.picture])
					.then(res => done(null, res[0]))
					.catch(console.log);
			} else return done(null, response[0]);
		})
		.catch(console.log);
});

passport.deserializeUser((user, done) => done(null, user));

app.get("/me", getUser);

app.get(
	"/login",
	passport.authenticate("auth0", {
		// successRedirect: "/",
		successRedirect: "http://localhost:3000/#/",
		// successRedirect: "/#/",
		failureRedirect: "/login"
	})
);

app.post("/api/addproducts", control.addToProducts);
app.get("/api/products", control.getProducts);

app.listen(port, () => {
	console.log(`app is listening in port ${port}`);
});

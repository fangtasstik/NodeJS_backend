require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const { errorHandler } = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// custom middleware logger,  @NOTE: moved to logEvents.js
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross-Origin Resource Sharing -  @NOTE: moved to cors-whitelist.js
app.use(cors(corsOptions));

// 3 common Built-in middlewares
// @NOTE: handle URL-encoded data (form data) - Header: 'Content-Type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));
// Built-in middleware for JSON
app.use(express.json());
// middleware for cookies
app.use(cookieParser());

// Serve static files - @NOTE: moved all static files to the public folder
// app.use(express.static(path.join(__dirname, "/public")));
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// @NOTE: moved routing for root to routes/root.js
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
// routing any request coming for the /subdir to the router in routes/subdir.js
app.use("/subdir", require("./routes/subdir"));
// put verifyJWT below all requests to static pages and above api calls
app.use(verifyJWT);
// take employees as an example to demonstrate how we handle get/post/put/delete requests
app.use("/employees", require("./routes/api/employees"));
// test using fetch
app.use("/phusers", require("./routes/api/phusers"));
// app.use("/roles", require("./routes/api/roles"));

// error handler middleware @NOTE: must be the last middleware in the stack
app.use(errorHandler);

// app.get() only handles get requests, app.all() handles all requests
// app.get("/*", (req, res) => {
// 	res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });
// refined 404 handler, handle all unmatched routes streamed from above
app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		// if client header 'Accept: text/html'
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		// if client header 'Accept: application/json'
		res.json({ error: "404 Not Found" });
	} else {
		res.type("txt").send("404 Not Found");
	}
});

// add a custom error handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});

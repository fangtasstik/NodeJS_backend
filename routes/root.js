const express = require("express");
const router = express.Router();
const path = require("path");

// specify the routes @NOTE: regex
router.get("^/$|/index(.html)?", (req, res) => {
	// res.send('Hello World!');
	// res.sendFile('./views/index.html', { root: __dirname }); // specify the root dir
	res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

/* router.get("/new-page(.html)?", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

router.get("/old-page(.html)?", (req, res) => {
	res.redirect(301, "./new-page.html"); // 302 by default, specify 301 will tell Search Engine to update the link
}); */

// ===== @NOTE: Route handler (Middleware) =====

// === example 1 ===, next() will  pass the control to next handler, @NOTE: test case: /hello
/* router.get(
	"/hello(.html)?",
	(req, res, next) => {
		console.log("Attempted to load hello.html");
		next();
	},
	(req, res) => {
		res.send("Hello World!");
	}
); */
// output: Attempted to load hello.html Hello World!

// === example 2 ===, chaining route handlers, @NOTE: test case: /chain
/* const one = (req, res, next) => {
	console.log("one");
	next();
};
const two = (req, res, next) => {
	console.log("two");
	next();
};
const three = (req, res) => {
	console.log("three");
	res.send("Finished!");
};
router.get("/chain(.html)?", [one, two, three]); */
// output: one two three Finished!

module.exports = router;
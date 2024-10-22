const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401); // Unauthorized
	const token = authHeader.split(" ")[1]; // Split to extract the token
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403); // Forbidden, invalid token
		req.user = decoded.UserInfo.username; // Set the decoded username in the request object
		req.roles = decoded.UserInfo.roles; // Set the decoded roles in the request object
		console.log("decoded - ", decoded);
		next(); // Pass to the next middleware or route handler
	});
};

module.exports = verifyJWT;

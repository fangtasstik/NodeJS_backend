const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
	console.log(req);
	const { user, pwd } = req.body;
	if (!user || !pwd)
		return res
			.status(400)
			.json({ message: "Username and password are required." });
	// Check for duplicate usernames in the database
	const foundUser = await User.findOne({ username: user }).exec();
	console.log(foundUser);
	
	if (!foundUser) return res.sendStatus(401); // Unauthorized
	// Evaluate the password
	const match = await bcrypt.compare(pwd, foundUser.password);
	if (match) {
		const roles = Object.values(foundUser.roles);
		// create JWTs: Access, Fresh, ...
		const accessToken = jwt.sign(
			{
				UserInfo: {
					username: foundUser.username,
					roles: roles,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "60s" }
		);
		const refreshToken = jwt.sign(
			{ username: foundUser.username },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "1d" }
		);
		foundUser.refreshToken = refreshToken;
		const result = await foundUser.save();
		// httpOnly cookie will not be accessible in JavaScript
		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			sameSite: "None",
			secure: true, // for https
			maxAge: 24 * 60 * 60 * 1000,
		});

		// 在响应头中设置 Authorization
		// res.setHeader("Authorization", `Bearer ${accessToken}`);

		res.json({ accessToken });
	} else {
		res.sendStatus(401); // Unauthorized
	}
};

module.exports = { handleLogin };

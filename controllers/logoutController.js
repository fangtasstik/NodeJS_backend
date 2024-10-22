const User = require("../model/User");

const handleLogout = async (req, res) => {
	const cookies = req.cookies;
	// optional chaining operator
	if (!cookies?.jwt) return res.sendStatus(204); // No Content
	const refreshToken = cookies.jwt;

	// Check for refreshToken in the database
	const foundUser = await User.findOne({ refreshToken }).exec();
	if (!foundUser) {
		res.clearCookie("jwt", { httpOnly: true });
		return res.sendStatus(204);
	}
	
	foundUser.refreshToken = "";
	const result = await foundUser.save();

	// Clear cookie
	res.clearCookie("jwt", {
		httpOnly: true,
		sameSite: "None",
		secure: true,
	}); // add 'secure: true' in production - only serves on https
	res.sendStatus(204);
};

module.exports = { handleLogout };

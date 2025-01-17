const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
	const { user, pwd } = req.body;
	// Check if username or password is missing
	if (!user || !pwd)
		return res
			.status(400)
			.json({ message: "Username and password are required." });
	// Check for duplicate usernames in the database
	const duplicate = await User.findOne({ username: user }).exec();
	if (duplicate) return res.sendStatus(409); // Conflict
	try {
		// Encrypt the password
		const hashedPwd = await bcrypt.hash(pwd, 10);

		// Create and store the new user
		const result = await User.create({
			username: user,
			password: hashedPwd,
		});
		// alternatively
		/* const newUser = new User({
			username: user,
			password: hashedPwd,
		});
		const result = await newUser.save(); */

		console.log(result);

		res.status(201).json({
			message: `New user ${user} created!`,
			success: true,
			redirectUrl: "/auth",
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { handleNewUser };

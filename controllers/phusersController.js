const data = {
	users: null,
	setUsers: function (data) {
		this.users = data;
	},
};

// Initialize users data
const initializeUsers = async () => {
	try {
		const response = await fetch("https://jsonplaceholder.typicode.com/users");
		data.users = await response.json();
	} catch (error) {
		console.error("Failed to fetch users:", error);
		data.users = []; // Set to empty array or handle error as appropriate
	}
};

// Call this function when your application starts
initializeUsers();

const getAllUsers = async (req, res) => {
	try {
		if (!data.users) {
			await initializeUsers(); // Ensure users are loaded
		}
		res.json(data.users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = {
	getAllUsers,
	initializeUsers, // Export this if you need to call it elsewhere
};

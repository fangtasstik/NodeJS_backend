const data = {
	roles: require("../config/roles_list"),
	setRoles: function (data) {
		this.roles = data;
	}
};

const getAllRoles = (req, res) => {
	res.json(data.roles);
};

const createNewRole = (req, res) => {
	const newRole = {
		// use ?.id to check if id exists and use it, avoid runtime error
		id: data.roles[data.roles.length - 1]?.id + 1 || 1,
		role: req.body.role,
	};
	if (!newRole.role) {
		return res.status(400).json({
			message: "Role is required.",
		});
	}
	data.setRoles([...data.roles, newRole]);
	res.status(201).json(data.roles);
};

const updateRole = (req, res) => {
	const role = data.roles.find(
		(role) => role.id === parseInt(req.body.id)
	);
	if (!role) {
		return res.status(400).json({
			message: `Role ID ${req.body.id} not found`,
		});
	}
	if (req.body.role) role.role = req.body.role;
	const filteredArray = data.roles.filter(
		(role) => role.id !== parseInt(req.body.id)
	);
	    const unsortedArray = [...filteredArray, role];
	data.setRoles(
		unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
	);
	res.json(data.roles);
};

const deleteRole = (req, res) => {
	const role = data.roles.find(
		(role) => role.id === parseInt(req.body.id)
	);
	if (!role) {
		return res.status(400).json({
			message: `Role ID ${req.body.id} not found`,
		});
	}
	const filteredArray = data.roles.filter(
		(role) => role.id !== parseInt(req.body.id)
	);
	data.setRoles([...filteredArray]);
	res.json(data.roles);
};

const getRole = (req, res) => {
	const role = data.roles.find(
		(role) => role.id === parseInt(req.params.id)
	);
	if (!role) {
		return res.status(400).json({
			message: `Role ID ${req.params.id} not found`,
		});
	}
	res.json(role);
};

module.exports = {
	getAllRoles,
	createNewRole,
	updateRole,
	deleteRole,
	getRole,
};

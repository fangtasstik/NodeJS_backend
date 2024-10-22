const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/employeeController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

// moved logic to get/post/put/delete to employeeController
router
	.route("/")
	.get(employeeController.getAllEmployees)
	.post(
		verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
		employeeController.createNewEmployee
	)
	.put(
		verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
		employeeController.updateEmployee
	)
	.delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployee);

// Export the router if needed
module.exports = router;

const express = require('express');
const router = express.Router();
const rolesController = require('../../controllers/rolesController');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');

router.route('/')
    .get(rolesController.getAllRoles)
    .post(verifyRoles(ROLES_LIST.Admin), rolesController.createNewRole)
    .put(verifyRoles(ROLES_LIST.Admin), rolesController.updateRole)
    .delete(verifyRoles(ROLES_LIST.Admin), rolesController.deleteRole);

module.exports = router;

const express = require("express");
const router = express.Router();
const phusersController = require("../../controllers/phusersController");
// const verifyJWT = require("../../middleware/verifyJWT");

// Use verifyJWT in server.js instead of here
// router.route("/").get(verifyJWT, phusersController.getAllUsers);
router.route("/").get(phusersController.getAllUsers);

module.exports = router;

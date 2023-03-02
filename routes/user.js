// Dependencies
const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController");

// path routes
router.post("/register", userControllers.registerUserPost);

router.get("/", userControllers.registerUserGet);

// Export module
module.exports = router;

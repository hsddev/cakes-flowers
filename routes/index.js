// Dependencies
const express = require("express");
const router = express.Router();

const userRoutes = require("./user");

// Routes path
router.use("/", userRoutes);

// Export module
module.exports = router;

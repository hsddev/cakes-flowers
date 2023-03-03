// Dependencies
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const { sendEmail } = require("../helpers");

// Container for the module
let userControllers = {};

// Register a new user POST
userControllers.registerUserPost = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get the data
    const { firstName, lastName, email, phone, password, confirmedPassword } =
        req.body;

    // Check if password and confirm password match
    if (password !== confirmedPassword) {
        return res.status(400).json({ msg: "Passwords do not match" });
    }

    try {
        // Check if user's email address or the phone number already exists
        let user = await User.findOne({ $or: [{ email }, { phone }] });

        if (user) {
            if (user.email === email) {
                return res.status(400).json({ msg: "Email already exists" });
            } else {
                return res
                    .status(400)
                    .json({ msg: "Phone number already exists" });
            }
        }

        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Create new user
        user = new User({
            firstName,
            lastName,
            email,
            phone,
            password,
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to database
        await user.save();

        // Send email to user
        const subject = "Welcome to My Cake Shop";
        const text = `Hi ${user.firstName}. Thank you for registering with My Cake Shop!`;

        await sendEmail(email, subject, text);

        // Return JSON web token
        res.json({ token: user.generateAuthToken() });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// Register a new user GET
userControllers.registerUserGet = (req, res) => {
    res.render("register");
};

// Update user's data
userControllers.updateUserData = (req, res) => {};

// Login POST
userControllers.loginPost = (req, res) => {};

// Login GET
userControllers.loginGet = (req, res) => {};

// Logout
userControllers.logOutUser = (req, res) => {};

// Get all users
userControllers.getAllUsers = (req, res) => {};

// Export module
module.exports = userControllers;

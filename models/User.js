// Dependencies
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secret = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    created: {
        type: Date,
        default: Date.now(),
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
});

// Generate JSON web token
userSchema.methods.generateAuthToken = function () {
    const payload = {
        user: {
            id: this._id,
        },
    };

    // Use secret in JWT signing
    return jwt.sign(payload, secret, { expiresIn: 3600 });
};

const User = mongoose.model("User", userSchema);

// Export module
module.exports = User;

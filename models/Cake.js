// Dependencies
const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

const Cake = mongoose.model("Cake", cakeSchema);

// Export module
module.exports = Cake;

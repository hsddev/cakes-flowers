// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const dotenv = require("dotenv");
const path = require("path");
const router = require("./routes/");
const app = new express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Static folder
app.use("/assets", express.static("assets"));

// Route path
app.use("/", router);

// Mongodb connection
const database = process.env.MONGOLAB_URL;

mongoose.set("strictQuery", false);
mongoose
    .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("Successfully connected !"))
    .catch((err) => console.log(err));

// Run the server
app.listen(port, () => {
    console.log(`Start listening to port ${port}`);
});

// Dependencies
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const app = new express();
const port = process.env.PORT || 3000;

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Static folder
app.use("/assets", express.static("assets"));

app.get("/", (req, res) => {
    res.render("single-product-sale.ejs");
});

// Run the server
app.listen(port, () => {
    console.log(`Start listening to port ${port}`);
});

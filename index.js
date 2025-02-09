const express = require("express");
const path = require("path");
const mongo = require("mongoose");
const cookieparser = require("cookie-parser");
const {createServer} = require("http");

const {route} = require("./routes/userRoutes.js");


const {checkUserAuthentication} = require("./middlewares/token.js");

const PORT = 8000;
const app = express();





console.log(`http://localhost:${PORT}/user/login`);

app.use(express.urlencoded({ extended: true }));  // For form data
app.use(express.json());  // For JSON data

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));


mongo.connect("mongodb://127.0.0.1:27017/krishi")
.then( () => {console.log("Database connected successfully")});





app.use(cookieparser());
app.use(checkUserAuthentication("uid"));

app.use("/user",route);

// app.use(express.static(path.join(__dirname, 'public')));
// app.set("views", path.join(__dirname, "views")); // Correct setup


app.listen(PORT,() => {console.log(`Server started at ${PORT}`)});



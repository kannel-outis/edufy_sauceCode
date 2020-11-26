// jshint esversion: 6
const express = require('express');
const handleErrors = require('http-errors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./helpers/mongo.db');
const route = require('./Routes/auth.route');
const userRoute = require('./Routes/user.route');
const courseRoute = require('./Routes/course.route');
const { verifyToken } = require('./helpers/token_helper');
require('events').EventEmitter.defaultMaxListeners = 100;




const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", route);
app.use("/user/", userRoute);
app.use("/", courseRoute);


app.get("/", verifyToken, function (req, res) {
    // const auth_token = req.headers.authorization;
    console.log(req.payload);
    res.send("message");
});

app.use((req, res, next) => {
    var error = handleErrors.NotFound("Page not Found");
    next(error);

});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        error: {
            message: error.message,
            statusCode: error.status || 500
        }
    });

});







app.listen(PORT, function () {
    console.log("Listening to port 3000");
});
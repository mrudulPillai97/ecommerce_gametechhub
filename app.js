const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const path = require("path");

// config env
if(process.env.NODE_ENV !== 'production') {
    require("dotenv").config({path: "./config/config.env"})
}

const errorMiddleware = require("./middlewares/error");
const options = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(express.json());
app.use(cors(options));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// route imports
const user = require("./routes/userRoute");
const product = require("./routes/productRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", payment);


app.use("/api/v1", (req, res) => {
    res.send({
        message: "Welcome to E-Shopify"
    })
})

app.use(express.static(path.join(__dirname,"/frontend/build")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"/frontend/build/index.html"));
})

// middleware for errors
app.use(errorMiddleware);

module.exports = app; 

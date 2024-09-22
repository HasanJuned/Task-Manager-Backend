// Application Configuration
require("dotenv").config()
const express = require("express");
const app = express();
const router = require("./src/routes/api");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer');

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

// Apply mongoose-sanitizer plugin to mongoose globally
mongoose.plugin(sanitizerPlugin);

// Use middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());
//app.use(sanitizerPlugin)
app.use(hpp());
app.use(helmet());
app.use(limiter);
app.use('/api/v1', router);

// let URI = "mongodb+srv://<username>:<password>@cluster0.7uslu.mongodb.net/practise?retryWrites=true&w=majority";
// let OPTION = {user: 'admin', pass:'admin', autoIndex: true}

mongoose.connect("mongodb://localhost:27017/TaskManager")
.then(()=>console.log('Database practise connected'))
.catch((error)=>{
    console.log('Failed to connect with database');
    console.log(error);
    process.exit(1);
})

module.exports = app;

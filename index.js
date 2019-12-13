// Registering aliases
require('module-alias/register')

// ExpressJS
const express = require('express');

// Mongoose API to connect to MongoDB
const mongoose = require('mongoose');

// Configuration
const Config = require('@globals/config.json');

// Middlewares
const token = require('@middlewares/token');

// Create database connection 
mongoose.connect(Config.private.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .catch((error) => {
        console.log(error);
    });

// Connected
mongoose.connection.on('connected', function () {
    console.log(`Mongoose connected to ${Config.private.mongo.url}`);
});

// Disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

// If Node process ends, close Mongoose connection 
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection terminated due to app termination');
        process.exit(0);
    });
});

// Initialize
const app = express();
app.use(express.json());

// Middleware to enable CORS
const cors = require("cors");
app.use(cors());

// Middleware to decrypt token

// Routes
const routes = require('@routes/index');
app.use('/', routes.router);

// Bind
app.listen(Config.app.port, () => {
    console.log(`${Config.app.name} : ${Config.app.port}`);
});
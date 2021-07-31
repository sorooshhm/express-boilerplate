"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./src/lib/Application");
const express = require("express");
const routes_1 = require("./src/routes/routes");
const options = {
    port: 3000,
    middllewaresArray: [
        { cb: express.json() },
        { cb: express.urlencoded({ extended: false }) },
    ]
};
const { app } = new Application_1.default(options);
app.use("/api", routes_1.default);
app.use((error, req, res, next) => {
    return res.status(error.code || 500).send({ message: error.message });
});

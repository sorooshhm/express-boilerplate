"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose_1 = require("mongoose");
class Application {
    constructor(opt) {
        this.app = express();
        this.port = opt.port;
        this.db_address = opt.db_address;
        this.middllewaresArray = opt.middllewaresArray;
        this.setUpServer();
        this.setDb();
        this.setUpMiddleWares();
    }
    setUpServer() {
        this.app.listen(this.port, () => {
            console.log("App is listening to port " + this.port);
        });
    }
    setDb() {
        this.db_address && (mongoose_1.default.connect(this.db_address, {
            useNewUrlParser: true, useUnifiedTopology: true
        })
            .then(_ => {
            console.log("Db connected");
        })
            .catch(err => {
            throw err;
        }));
    }
    setUpMiddleWares() {
        if (this.middllewaresArray) {
            this.middllewaresArray.map(m => {
                m.path ? this.app.use(m.path, m.cb) : this.app.use(m.cb);
            });
        }
    }
}
exports.default = Application;

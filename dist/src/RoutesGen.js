"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class Route {
    constructor(controllers) {
        this.controllers = controllers;
        this.router = express.Router();
        this.controllers = controllers;
        this.controllers.map(({ cn, path }) => {
            this.addRoutes(cn, path);
        });
    }
    addRoutes(Cn, path) {
        const instance = new Cn();
        let handlers = Object.getOwnPropertyNames(Cn.prototype);
        handlers.shift();
        Object.keys(instance).map((m) => {
            if (typeof instance[m] == "function")
                handlers.push(m);
        });
        handlers.map((m) => {
            let [method, ...name] = m.split("_");
            this.router[method](`/${path}/${name.join("_")}`, (Cn.middllewares || {})[m] || [instance[m]]);
        });
    }
}
exports.default = Route;

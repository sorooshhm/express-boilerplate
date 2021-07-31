import * as express from "express";
class Route {
    router = express.Router();
    constructor(public controllers: { cn, path }[]) {
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
            if (typeof instance[m] == "function") handlers.push(m);
        });
        handlers.map((m) => {
            let [method, ...name]: string[] = m.split("_");
            this.router[method](
                `/${path}/${name.join("_")}`,
                (Cn.middllewares || {})[m] || [instance[m]],

            );
        });
    }
}

export default Route
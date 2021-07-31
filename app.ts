import Application from "./src/lib/Application";
import * as express from "express";
import router from "./src/routes/routes";

const options = {
    port: 3000,
    middllewaresArray: [
        { cb: express.json() },
        { cb: express.urlencoded({ extended: false }) },
    ]
}

const { app } = new Application(options);

app.use("/api", router)

app.use((error, req, res, next) => {
    return res.status(error.code || 500).send({ message: error.message })
})
import * as express from 'express';
import mongoose from "mongoose";

type Middllewares = { path?: string, cb: (req: express.Request, res: express.Response, next: express.NextFunction) => unknown }

interface Options {
    port: number;
    middllewaresArray?: Middllewares[];
    db_address?: string;
}

class Application {
    app: express.Application = express();
    middllewaresArray?: Middllewares[];
    port: number;
    db_address?: string;
    constructor(opt: Options) {
        this.port = opt.port;
        this.db_address = opt.db_address;
        this.middllewaresArray = opt.middllewaresArray;
        this.setUpServer();
        this.setDb();
        this.setUpMiddleWares()
    }
    setUpServer() {
        this.app.listen(this.port, () => {
            console.log("App is listening to port " + this.port)
        })
    }
    setDb() {
        this.db_address && (
            mongoose.connect(this.db_address, {
                useNewUrlParser: true, useUnifiedTopology: true
            })
                .then(_ => {
                    console.log("Db connected");
                })
                .catch(err => {
                    throw err;
                })
        )
    }
    setUpMiddleWares() {
        if (this.middllewaresArray) {
            this.middllewaresArray.map(m => {
                m.path ? this.app.use(m.path, m.cb) : this.app.use(m.cb)
            })
        }

    }
}

export default Application
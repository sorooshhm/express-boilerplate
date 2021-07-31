import * as express from 'express';
declare type Middllewares = {
    path?: string;
    cb: (req: express.Request, res: express.Response, next: express.NextFunction) => unknown;
};
interface Options {
    port: number;
    middllewaresArray?: Middllewares[];
    db_address?: string;
}
declare class Application {
    app: express.Application;
    middllewaresArray?: Middllewares[];
    port: number;
    db_address?: string;
    constructor(opt: Options);
    setUpServer(): void;
    setDb(): void;
    setUpMiddleWares(): void;
}
export default Application;

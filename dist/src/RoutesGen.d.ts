declare class Route {
    controllers: {
        cn: any;
        path: any;
    }[];
    router: import("express-serve-static-core").Router;
    constructor(controllers: {
        cn: any;
        path: any;
    }[]);
    addRoutes(Cn: any, path: any): void;
}
export default Route;

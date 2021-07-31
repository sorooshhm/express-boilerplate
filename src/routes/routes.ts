import Route from "../lib/RoutesGen";
import UserController from "../controllers/user.controller";

const { router } = new Route([{ path: "users", cn: UserController }]);

export default router

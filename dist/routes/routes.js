"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoutesGen_1 = require("../lib/RoutesGen");
const user_controller_1 = require("../controllers/user.controller");
const { router } = new RoutesGen_1.default([{ path: "users", cn: user_controller_1.default }]);
exports.default = router;

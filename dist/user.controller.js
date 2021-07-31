"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("./src/lib/decorators/decorators");
const users = ["soroosh", "saba", "amir", "ali"];
class User {
}
__decorate([
    decorators_1.required(),
    decorators_1.isString()
], User.prototype, "name", void 0);
__decorate([
    decorators_1.required(),
    decorators_1.isNumber()
], User.prototype, "age", void 0);
__decorate([
    decorators_1.isEmail()
], User.prototype, "email", void 0);
class UserController {
    get_getUsers(req, res) {
        res.send(users);
    }
    post_postUser(req, res) {
        users.push(req.body);
        return res.send(users);
    }
}
__decorate([
    decorators_1.Body(User)
], UserController.prototype, "post_postUser", null);
exports.default = UserController;

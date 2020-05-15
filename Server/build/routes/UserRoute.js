"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
class UserRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', UserController_1.userController.test);
        this.router.get('/:id', UserController_1.userController.getUser);
        this.router.post('/', UserController_1.userController.create);
        this.router.put('/:id', UserController_1.userController.update);
    }
}
const userRoute = new UserRoute();
exports.default = userRoute.router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LoginController_1 = require("../controllers/LoginController");
class LoginRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', LoginController_1.loginController.test);
        this.router.post('/', LoginController_1.loginController.login);
        this.router.post('/register', LoginController_1.loginController.register);
    }
}
const loginRoute = new LoginRoute();
exports.default = loginRoute.router;

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
        this.router.get('/:id', LoginController_1.loginController.getLogin);
        this.router.put('/reset/:id', LoginController_1.loginController.resetPassword);
        this.router.post('/register', LoginController_1.loginController.register);
        this.router.get('/getEmail/:id', LoginController_1.loginController.getEmail);
    }
}
const loginRoute = new LoginRoute();
exports.default = loginRoute.router;

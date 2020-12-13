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
        this.router.get('/byId/:id', UserController_1.userController.getUserById);
        this.router.get('/byOffice/:id', UserController_1.userController.getUserByOffice);
        this.router.get('/byClient/:id', UserController_1.userController.getUserByClient);
        this.router.post('/register', UserController_1.userController.register);
        this.router.post('/employee', UserController_1.userController.createEmployee);
        this.router.post('/client', UserController_1.userController.createClient);
        this.router.put('/:id', UserController_1.userController.update);
        this.router.post('/changeStatus', UserController_1.userController.changeStatus);
        this.router.put('/employee/:id', UserController_1.userController.updateEmployee);
        this.router.put('/client/:id', UserController_1.userController.updateClient);
        this.router.put('/changeAvatar/:id', UserController_1.userController.changeAvatar);
        this.router.get('/login/:id', UserController_1.userController.login);
        this.router.get('/logout/:id', UserController_1.userController.logout);
    }
}
const userRoute = new UserRoute();
exports.default = userRoute.router;

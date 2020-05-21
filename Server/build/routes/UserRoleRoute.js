"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRoleController_1 = require("../controllers/UserRoleController");
class UserRoleRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', UserRoleController_1.userRoleController.test);
        this.router.get('/', UserRoleController_1.userRoleController.load);
    }
}
const userRoleRoute = new UserRoleRoute();
exports.default = userRoleRoute.router;

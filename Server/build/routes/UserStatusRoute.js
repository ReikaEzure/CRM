"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserStatusController_1 = require("../controllers/UserStatusController");
class UserStatusRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', UserStatusController_1.userStatusController.test);
        this.router.get('/', UserStatusController_1.userStatusController.load);
    }
}
const userStatusRoute = new UserStatusRoute();
exports.default = userStatusRoute.router;

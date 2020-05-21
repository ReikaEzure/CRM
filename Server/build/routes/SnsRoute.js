"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SnsController_1 = require("../controllers/SnsController");
class SnsRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', SnsController_1.snsController.test);
        this.router.get('/', SnsController_1.snsController.load);
        this.router.post('/', SnsController_1.snsController.create);
    }
}
const snsRoute = new SnsRoute();
exports.default = snsRoute.router;

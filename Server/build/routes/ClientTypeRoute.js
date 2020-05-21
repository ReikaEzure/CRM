"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClientTypeController_1 = require("../controllers/ClientTypeController");
class ClientTypeRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', ClientTypeController_1.clientTypeController.test);
        this.router.get('/', ClientTypeController_1.clientTypeController.load);
    }
}
const clientTypeRoute = new ClientTypeRoute();
exports.default = clientTypeRoute.router;

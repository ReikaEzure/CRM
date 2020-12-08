"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PhoneController_1 = require("../controllers/PhoneController");
class PhoneRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', PhoneController_1.phoneController.test);
        this.router.get('/', PhoneController_1.phoneController.load);
        this.router.post('/', PhoneController_1.phoneController.create);
        this.router.delete('/:id', PhoneController_1.phoneController.delete);
        this.router.get('/:id', PhoneController_1.phoneController.getForOne);
    }
}
const phoneRoute = new PhoneRoute();
exports.default = phoneRoute.router;

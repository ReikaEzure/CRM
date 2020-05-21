"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AddressController_1 = require("../controllers/AddressController");
class AddressRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', AddressController_1.addressController.test);
        this.router.get('/', AddressController_1.addressController.load);
        this.router.post('/', AddressController_1.addressController.create);
    }
}
const addressRoute = new AddressRoute();
exports.default = addressRoute.router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OfficeController_1 = require("../controllers/OfficeController");
class OfficeRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', OfficeController_1.officeController.test);
        this.router.get('/', OfficeController_1.officeController.load);
        this.router.get('/:id', OfficeController_1.officeController.getOne);
        this.router.post('/', OfficeController_1.officeController.create);
        this.router.put('/:id', OfficeController_1.officeController.update);
        this.router.delete('/:id', OfficeController_1.officeController.delete);
    }
}
const officeRoute = new OfficeRoute();
exports.default = officeRoute.router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InvoiceController_1 = require("../controllers/InvoiceController");
class InvoiceRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', InvoiceController_1.invoiceController.test);
        this.router.get('/', InvoiceController_1.invoiceController.list);
        this.router.get('/:id', InvoiceController_1.invoiceController.getOne);
        this.router.post('/', InvoiceController_1.invoiceController.create);
        this.router.put('/:id', InvoiceController_1.invoiceController.update);
        this.router.delete('/:id', InvoiceController_1.invoiceController.delete);
    }
}
const invoiceRoute = new InvoiceRoute();
exports.default = invoiceRoute.router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClientCompanyController_1 = require("../controllers/ClientCompanyController");
class ClientCompanyRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', ClientCompanyController_1.clientCompanyController.test);
        this.router.get('/', ClientCompanyController_1.clientCompanyController.list);
        this.router.get('/:id', ClientCompanyController_1.clientCompanyController.getOne);
        this.router.get('/byUser/:id', ClientCompanyController_1.clientCompanyController.getClientCompany);
        this.router.post('/', ClientCompanyController_1.clientCompanyController.create);
        this.router.put('/:id', ClientCompanyController_1.clientCompanyController.update);
        this.router.delete('/:id', ClientCompanyController_1.clientCompanyController.delete);
    }
}
const clientCompanyRoute = new ClientCompanyRoute();
exports.default = clientCompanyRoute.router;

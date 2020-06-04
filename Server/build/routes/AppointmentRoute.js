"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AppointmentController_1 = require("../controllers/AppointmentController");
class AppointmentRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', AppointmentController_1.appointmentController.test);
        this.router.get('/', AppointmentController_1.appointmentController.list);
        this.router.get('/:id', AppointmentController_1.appointmentController.getOne);
        this.router.post('/', AppointmentController_1.appointmentController.create);
        this.router.put('/:id', AppointmentController_1.appointmentController.update);
        this.router.delete('/:id', AppointmentController_1.appointmentController.delete);
    }
}
const appointmentRoute = new AppointmentRoute();
exports.default = appointmentRoute.router;

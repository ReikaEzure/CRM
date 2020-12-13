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
        this.router.get('/list/:id', AppointmentController_1.appointmentController.load);
        this.router.get('/today/', AppointmentController_1.appointmentController.listToday);
        this.router.get('/upcoming/', AppointmentController_1.appointmentController.listUpcoming);
        this.router.get('/done/', AppointmentController_1.appointmentController.listDone);
        this.router.get('/:id', AppointmentController_1.appointmentController.getOne);
        this.router.post('/', AppointmentController_1.appointmentController.create);
        this.router.put('/:id', AppointmentController_1.appointmentController.update);
        this.router.delete('/:id', AppointmentController_1.appointmentController.delete);
    }
}
const appointmentRoute = new AppointmentRoute();
exports.default = appointmentRoute.router;

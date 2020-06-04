"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProjectStatusController_1 = require("../controllers/ProjectStatusController");
class ProjectStatusRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', ProjectStatusController_1.projectStatusController.test);
        this.router.get('/', ProjectStatusController_1.projectStatusController.load);
    }
}
const projectStatusRoute = new ProjectStatusRoute();
exports.default = projectStatusRoute.router;

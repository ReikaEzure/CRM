"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProjectController_1 = require("../controllers/ProjectController");
class ProjectRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', ProjectController_1.projectController.test);
        this.router.get('/', ProjectController_1.projectController.list);
        this.router.get('/:id', ProjectController_1.projectController.getOne);
        this.router.post('/', ProjectController_1.projectController.create);
        this.router.put('/:id', ProjectController_1.projectController.update);
        this.router.put('/promotion/:id', ProjectController_1.projectController.modifyPromotion);
        this.router.delete('/:id', ProjectController_1.projectController.delete);
    }
}
const projectRoute = new ProjectRoute();
exports.default = projectRoute.router;

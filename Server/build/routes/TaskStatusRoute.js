"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaskStatusController_1 = require("../controllers/TaskStatusController");
class TaskStatusRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', TaskStatusController_1.taskStatusController.test);
        this.router.get('/', TaskStatusController_1.taskStatusController.load);
    }
}
const taskStatusRoute = new TaskStatusRoute();
exports.default = taskStatusRoute.router;

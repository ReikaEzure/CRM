"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaskController_1 = require("../controllers/TaskController");
class TaskRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', TaskController_1.taskController.test);
        this.router.get('/', TaskController_1.taskController.list);
        this.router.get('/:id', TaskController_1.taskController.getOne);
        this.router.post('/', TaskController_1.taskController.create);
        this.router.put('/:id', TaskController_1.taskController.update);
        this.router.delete('/:id', TaskController_1.taskController.delete);
    }
}
const taskRoute = new TaskRoute();
exports.default = taskRoute.router;

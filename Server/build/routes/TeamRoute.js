"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TeamController_1 = require("../controllers/TeamController");
class TeamRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', TeamController_1.teamController.test);
        this.router.get('/', TeamController_1.teamController.list);
        this.router.get('/:id', TeamController_1.teamController.getOne);
        this.router.post('/', TeamController_1.teamController.create);
        this.router.put('/:id', TeamController_1.teamController.update);
        this.router.delete('/:id', TeamController_1.teamController.delete);
    }
}
const teamRoute = new TeamRoute();
exports.default = teamRoute.router;

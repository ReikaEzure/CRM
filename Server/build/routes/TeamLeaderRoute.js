"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TeamLeaderController_1 = require("../controllers/TeamLeaderController");
class TeamLeaderRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', TeamLeaderController_1.teamLeaderController.test);
        this.router.get('/', TeamLeaderController_1.teamLeaderController.list);
        this.router.get('/:id', TeamLeaderController_1.teamLeaderController.getOne);
        this.router.post('/', TeamLeaderController_1.teamLeaderController.create);
        this.router.put('/:id', TeamLeaderController_1.teamLeaderController.update);
        this.router.delete('/:id', TeamLeaderController_1.teamLeaderController.delete);
    }
}
const teamLeaderRoute = new TeamLeaderRoute();
exports.default = teamLeaderRoute.router;

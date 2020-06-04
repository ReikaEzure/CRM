"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PersonalityTypeController_1 = require("../controllers/PersonalityTypeController");
class PersonalityTypeRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', PersonalityTypeController_1.personalityTypeController.test);
        this.router.get('/', PersonalityTypeController_1.personalityTypeController.load);
    }
}
const personalityTypeRoute = new PersonalityTypeRoute();
exports.default = personalityTypeRoute.router;

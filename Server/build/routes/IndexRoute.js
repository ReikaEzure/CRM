"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IndexController_1 = require("../controllers/IndexController");
class IndexRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', IndexController_1.indexController.index);
    }
}
const indexRoute = new IndexRoute();
exports.default = indexRoute.router;

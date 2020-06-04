"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PromotionController_1 = require("../controllers/PromotionController");
class PromotionRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/test', PromotionController_1.promotionController.test);
        this.router.get('/', PromotionController_1.promotionController.list);
        this.router.get('/:id', PromotionController_1.promotionController.getOne);
        this.router.post('/', PromotionController_1.promotionController.create);
        this.router.put('/:id', PromotionController_1.promotionController.update);
        this.router.delete('/:id', PromotionController_1.promotionController.delete);
    }
}
const promotionRoute = new PromotionRoute();
exports.default = promotionRoute.router;

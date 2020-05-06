"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.json({ text: 'Hello! from indexController' });
    }
}
exports.indexController = new IndexController();

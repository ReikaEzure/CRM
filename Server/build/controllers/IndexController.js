"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.json({ text: 'Hi!' });
    }
}
exports.indexController = new IndexController();

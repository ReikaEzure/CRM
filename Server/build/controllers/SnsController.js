"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.snsController = void 0;
const database_1 = __importDefault(require("../database"));
class SnsController {
    load(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sns = yield database_1.default.then((r) => r.query('SELECT * FROM SNS'));
            res.json(sns);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield database_1.default.then((r) => r.query('INSERT INTO SNS SET ?', [req.body]));
                res.json({ text: "The sns was saved" });
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    test(req, res) {
        res.json({ text: 'Hi! from snsController' });
    }
}
exports.snsController = new SnsController();

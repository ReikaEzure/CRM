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
exports.projectController = void 0;
const database_1 = __importDefault(require("../database"));
class ProjectController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield database_1.default.then((r) => r.query('SELECT * FROM Project'));
            res.json(project);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const project = yield database_1.default.then((r) => r.query('SELECT * FROM Project WHERE idProject = ?', [id]));
            if (project.length > 0) {
                return res.json(project[0]);
            }
            res.status(404).json({ text: "The Project does not exist" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield database_1.default.then((r) => r.query('INSERT INTO Project SET ?', [req.body]));
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then((r) => r.query('DELETE FROM Project WHERE idProject = ?', [id]));
            res.json({ text: "The Project was deleted" + req.params.id });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then((r) => r.query('UPDATE Project set ? WHERE idProject = ?', [req.body, id]));
            res.json({ text: "The Project was updated" + req.params.id });
        });
    }
    modifyPromotion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then((r) => r.query('UPDATE Project set promotion_idPromotion = ? WHERE idProject = ?', [req.body.promoId, id]));
            res.json({ text: "The Project was applied promotion" + req.params.id });
        });
    }
    test(req, res) {
        res.json({ text: 'Hi! from ProjectController' });
    }
}
exports.projectController = new ProjectController();

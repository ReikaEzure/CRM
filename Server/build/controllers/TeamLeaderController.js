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
exports.teamLeaderController = void 0;
const database_1 = __importDefault(require("../database"));
class TeamLeaderController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const teamLeader = yield database_1.default.then((r) => r.query('SELECT * FROM TeamLeader'));
            res.json(teamLeader);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const teamLeader = yield database_1.default.then((r) => r.query('SELECT * FROM TeamLeader WHERE idTeamLeader = ?', [id]));
            if (teamLeader.length > 0) {
                return res.json(teamLeader[0]);
            }
            res.status(404).json({ text: "The TeamLeader does not exist" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield database_1.default.then((r) => r.query('INSERT INTO TeamLeader SET ?', [req.body]));
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then((r) => r.query('DELETE FROM TeamLeader WHERE idTask = ?', [id]));
            res.json({ text: "The TeamLeader was deleted" + req.params.id });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then((r) => r.query('UPDATE TeamLeader set ? WHERE idTeamLeader = ?', [req.body, id]));
            res.json({ text: "The TeamLeader was updated" + req.params.id });
        });
    }
    test(req, res) {
        res.json({ text: 'Hi! from TeamLeaderController' });
    }
}
exports.teamLeaderController = new TeamLeaderController();

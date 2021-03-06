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
exports.officeController = void 0;
const database_1 = __importDefault(require("../database"));
class OfficeController {
    load(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const office = yield database_1.default.then((r) => r.query('SELECT * FROM Office'));
            res.json(office);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const office = yield database_1.default.then((r) => r.query('SELECT o.idOffice, o.name, o.phone, o.nif ' +
                'FROM Office o ' +
                'JOIN Employee emp ON o.idOffice = emp.office_idOffice ' +
                'Where emp.user_idUser = ?;', [id]));
            if (office.length > 0) {
                return res.json(office[0]);
            }
            res.status(404).json({ text: "The office does not exist" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield database_1.default.then((r) => r.query('INSERT INTO Office SET ?', [req.body]));
                const lastInserted = yield database_1.default.then((r) => r.query('SELECT * from Office WHERE name = ? AND nif = ? AND phone = ?', [req.body.name, req.body.nif, req.body.phone]));
                res.json(lastInserted);
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then((r) => r.query('DELETE FROM Office WHERE idOffice = ?', [id]));
            res.json({ text: "The office was deleted" + req.params.id });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then((r) => r.query('UPDATE Office set ? WHERE idOffice = ?', [req.body, id]));
            res.json({ text: "The office was updated" + req.params.id });
        });
    }
    test(req, res) {
        res.json({ text: 'Hi! from officeController' });
    }
}
exports.officeController = new OfficeController();

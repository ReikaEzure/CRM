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
exports.clientCompanyController = void 0;
const database_1 = __importDefault(require("../database"));
class ClientCompanyController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield database_1.default.then((r) => r.query('SELECT * FROM ClientCompany'));
            res.json(clients);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const client = yield database_1.default.then((r) => r.query('SELECT * FROM ClientCompany WHERE idClient = ?', [id]));
            if (client.length > 0) {
                return res.json(client[0]);
            }
            res.status(404).json({ text: "The client does not exist" });
        });
    }
    getClientCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const office = yield database_1.default.then((r) => r.query('SELECT * FROM ClientCompany cc ' +
                'JOIN Client c ON cc.idClient = c.clientCompany  ' +
                'Where c.user_idUser = ?;', [id]));
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
                yield database_1.default.then((r) => r.query('INSERT INTO ClientCompany SET ?', [req.body]));
                const lastInserted = yield database_1.default.then((r) => r.query('SELECT * from ClientCompany WHERE companyName = ? AND nif = ? AND email = ?', [req.body.companyName, req.body.nif, req.body.email]));
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
            yield database_1.default.then((r) => r.query('DELETE FROM ClientCompany WHERE idClient = ?', [id]));
            res.json({ text: "The client was deleted" + req.params.id });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then((r) => r.query('UPDATE ClientCompany set ? WHERE idClient = ?', [req.body, id]));
            res.json({ text: "The client was updated" + req.params.id });
        });
    }
    test(req, res) {
        res.json({ text: 'Hi! from ClientCompanyController' });
    }
}
exports.clientCompanyController = new ClientCompanyController();

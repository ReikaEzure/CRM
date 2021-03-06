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
exports.loginController = void 0;
const database_1 = __importDefault(require("../database"));
class LoginController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const login = yield database_1.default.then((r) => r.query('SELECT * from login WHERE username = ? AND password = ?', [req.body.username, req.body.password]));
            if (login.length > 0) {
                return res.json(login[0]);
            }
            res.status(404).json({ text: "The user doesn't exist" });
        });
    }
    validEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const login = yield database_1.default.then((r) => r.query('SELECT * from login WHERE email = ?', [req.body.email]));
            if (login.length > 0) {
                return res.json(login[0]);
            }
            res.status(404).json({ text: "The user doesn't exist" });
        });
    }
    getLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const login = yield database_1.default.then((r) => r.query('SELECT * FROM login WHERE idLogin = ?', [id]));
            if (login.length > 0) {
                return res.json(login[0]);
            }
            res.status(404).json({ text: "The login user does not exist" });
        });
    }
    getEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            const user = yield database_1.default.then((r) => r.query('SELECT email from Login WHERE idLogin = ?', [id]));
            if (user.length > 0) {
                return res.json(user[0]);
            }
            res.status(404).json({ text: "can't find the user" });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield database_1.default.then((r) => r.query('INSERT INTO login SET ?', [req.body]));
                const lastInserted = yield database_1.default.then((r) => r.query('SELECT * from login WHERE username = ? AND password = ?', [req.body.username, req.body.password]));
                res.json(lastInserted[0]);
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then((r) => r.query('UPDATE login set ? WHERE idLogin = ?', [req.body, id]));
            res.json({ text: "The password was resetted " + req.params.id });
        });
    }
    test(req, res) {
        res.json({ text: 'Hi! from logincontroller' });
    }
}
exports.loginController = new LoginController();

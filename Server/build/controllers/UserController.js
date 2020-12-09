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
exports.userController = void 0;
const database_1 = __importDefault(require("../database"));
class UserController {
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            const user = yield database_1.default.then((r) => r.query('SELECT * from user WHERE login_IdLogin = ?', [id]));
            if (user.length > 0) {
                return res.json(user[0]);
            }
            res.status(404).json({ text: "can't find the user" });
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            const user = yield database_1.default.then((r) => r.query('SELECT * from user WHERE idUser = ?', [id]));
            if (user.length > 0) {
                return res.json(user[0]);
            }
            res.status(404).json({ text: "can't find the user" });
        });
    }
    getUserByOffice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            try {
                const user = yield database_1.default.then((r) => r.query('SELECT u.idUser, u.firstName, u.lastName, l.email, u.status from User u ' +
                    'JOIN Login l ON u.login_idLogin = l.idLogin ' +
                    'JOIN Employee emp ON u.idUser = emp.user_idUser ' +
                    'JOIN Office o ON o.idOffice = emp.office_idOffice ' +
                    'where o.idOffice = ?;', [id]));
                return res.json(user);
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    getUserByClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            try {
                const user = yield database_1.default.then((r) => r.query('SELECT u.idUser, u.firstName, u.lastName, l.email, u.status  from User u ' +
                    'JOIN Login l ON u.login_idLogin = l.idLogin ' +
                    'JOIN Client cli ON u.idUser = cli.user_idUser ' +
                    'JOIN ClientCompany cc ON cc.idClient = cli.clientCompany ' +
                    'where cc.idClient = ?;', [id]));
                return res.json(user);
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield database_1.default.then((r) => r.query('INSERT INTO user SET ?', [req.body]));
                res.json({ message: "creating a user" });
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    createEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield database_1.default.then((r) => r.query('INSERT INTO Employee SET ?', [req.body]));
                res.json({ text: "add an employee: " + req.params.id });
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    createClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield database_1.default.then((r) => r.query('INSERT INTO Client SET ?', [req.body]));
                res.json({ text: "add a client: " + req.params.id });
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.then((r) => r.query('UPDATE user set ? WHERE idUser = ?', [req.body, id]));
                res.json({ text: "updating a user id: " + req.params.id });
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    updateEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.then((r) => r.query('UPDATE Employee set ? WHERE user_idUser = ?', [req.body, id]));
                res.json({ text: "updating a employee: " + req.params.id });
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    updateClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.then((r) => r.query('UPDATE Client set ? WHERE user_idUser = ?', [req.body, id]));
                res.json({ text: "updating a client: " + req.params.id });
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    changeAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.then((r) => r.query('UPDATE user set avatar = ? WHERE idUser = ?', [req.body.avatar, id]));
                res.json({ text: "Changing avatar of user id: " + req.params.id });
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.then((r) => r.query('UPDATE user set status = 1 WHERE login_idLogin = ?', [id]));
                res.json({ text: "user id: " + req.params.id + " change status as Working" });
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.then((r) => r.query('UPDATE user set status = 4 WHERE idUser = ?', [id]));
                res.json({ text: "user id: " + req.params.id + " logged out successfully" });
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    test(req, res) {
        res.json({ text: 'Hi! from UserController' });
    }
}
exports.userController = new UserController();

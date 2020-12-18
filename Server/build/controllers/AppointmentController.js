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
exports.appointmentController = void 0;
const database_1 = __importDefault(require("../database"));
class AppointmentController {
    load(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const appointment = yield database_1.default.then((r) => r.query('SELECT * FROM Appointment app ' +
                    'join Appointment_has_User au on app.idAppointment = au.appointment_idAppointment ' +
                    'where au.user_idUser = ?', [id]));
                return res.json(appointment);
            }
            catch (err) {
                res.status(404).json({ text: "The appointment does not exist" });
            }
        });
    }
    listToday(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let today = new Date().toISOString();
            const tomorrow = new Date();
            tomorrow.setHours(23, 59, 59);
            let tmr = tomorrow.toISOString();
            try {
                const appointment = yield database_1.default.then((r) => r.query("SELECT * FROM Appointment where date > '" + today + "' AND date < '" + tmr + "'"));
                res.json(appointment);
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    listUpcoming(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let today = new Date().toISOString();
            try {
                const appointment = yield database_1.default.then((r) => r.query("SELECT * FROM Appointment where date > '" + today + "'"));
                res.json(appointment);
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    listDone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let today = new Date().toISOString();
            try {
                const appointment = yield database_1.default.then((r) => r.query("SELECT * FROM Appointment where date <'" + today + "'"));
                res.json(appointment);
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const appointment = yield database_1.default.then((r) => r.query('SELECT * FROM Appointment WHERE idAppointment = ?', [id]));
            if (appointment.length > 0) {
                return res.json(appointment[0]);
            }
            res.status(404).json({ text: "The appointment does not exist" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield database_1.default.then((r) => r.query('INSERT INTO Appointment SET ?', [req.body]));
                const lastInserted = yield database_1.default.then((r) => r.query('SELECT * from Appointment WHERE date = ? AND description = ?', [req.body.date, req.body.description]));
                res.json(lastInserted[0]);
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    createAppo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                yield database_1.default.then((r) => r.query('INSERT INTO Appointment_has_User SET ?', [req.body]));
            }
            catch (err) {
                res.json({ text: "Error" + err.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then((r) => r.query('DELETE FROM Appointment WHERE idAppointment = ?', [id]));
            res.json({ text: "The Appointment was deleted" + req.params.id });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.then((r) => r.query('UPDATE Appointment set ? WHERE idAppointment = ?', [req.body, id]));
            res.json({ text: "The Appointment was updated" + req.params.id });
        });
    }
    test(req, res) {
        res.json({ text: 'Hi! from AppointmentController' });
    }
}
exports.appointmentController = new AppointmentController();

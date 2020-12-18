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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IndexController_1 = require("../controllers/IndexController");
class IndexRoute {
    constructor() {
        this.router = express_1.Router();
        this.nodemailer = require("nodemailer");
        this.config();
    }
    config() {
        this.router.get('/', IndexController_1.indexController.index);
        this.router.post("/sendmail", (req, res) => {
            console.log("request came");
            let user = req.body;
            this.sendMail(user, (info) => {
                console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
                res.send(info);
            });
        });
    }
    sendMail(user, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            // create reusable transporter object using the default SMTP transport
            let transporter = this.nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: 'info.rootlets@gmail.com',
                    pass: 'Rootlets1234'
                }
            });
            let mailOptions = {
                from: '"Rootlets "<info.rootlets@gmail.com>',
                to: user.email,
                subject: "Change password",
                html: `<h1>Hi ${user.name}</h1><br>
          <h3>We received a request to change your password.</h3>
          <p>Use the link below to set up a new password for your account.</p><br />
          <p>If you did not request to chage your password, ignore this email and the link will expire on its own.</p> 
          <a href="http://localhost:4200/changePass/15">Click link</a>
          `
            };
            // send mail with defined transport object
            let info = yield transporter.sendMail(mailOptions);
            callback(info);
        });
    }
}
const indexRoute = new IndexRoute();
exports.default = indexRoute.router;

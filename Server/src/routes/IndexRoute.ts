import { Router } from 'express';
import { indexController } from '../controllers/IndexController';

class IndexRoute {

    public router: Router = Router();
    nodemailer = require("nodemailer");

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', indexController.index);

        

        this.router.post("/sendmail", (req, res) => {
            console.log("request came");
            let user = req.body;
            this.sendMail(user, (info: { messageId: any; }) => {
              console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
              res.send(info);
            });
          });
          
          
    }

    public async sendMail(user:any, callback:any) {
        // create reusable transporter object using the default SMTP transport
        let transporter = this.nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'info.rootlets@gmail.com',
            pass: 'Rootlets1234'
          }
        });
      
        let mailOptions = {
          from: '"Rootlets "<info.rootlets@gmail.com>', // sender address
          to: user.email, // list of receivers
          subject: "Change password", // Subject line
          html: `<h1>Hi ${user.name}</h1><br>
          <h3>We received a request to change your password.</h3>
          <p>Use the link below to set up a new password for your account.</p><br />
          <p>If you did not request to chage your password, ignore this email and the link will expire on its own.</p> 
          <a href="http://localhost:4200/changePass/15">Click link</a>
          `
        };
      
        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);
      
        callback(info);
      }

}

const indexRoute = new IndexRoute();
export default indexRoute.router;
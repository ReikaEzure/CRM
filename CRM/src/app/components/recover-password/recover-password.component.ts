import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  recoveringForm: FormGroup;
  recoveringFailed: boolean = false;
  userData={email: ''};
  loading = false;
  buttionText = "Submit";
  user: any;

  constructor(private _fb: FormBuilder,private _service: UserService, private _authService: AuthenticationService, private _router: Router) { }

  ngOnInit(): void {
    this.recoveringForm = this._fb.group({
      email:['', [Validators.required]]
    });
  }

  onSubmit(){
    //get input data
    this.userData.email=this.recoveringForm.get('email').value;
    
    //load data from Login table
    this._authService.validEmail(this.userData).subscribe(
      res => { 
        this.user=res;
        this.changePass();
      },
      err => { 
        console.log(err); 
        this.recoveringFailed=true;
      }
    );
    this.recoveringForm.reset();
  }

  changePass() {
    this.loading = true;
    this.buttionText = "Submiting...";
    let user = {
      name: this.user.username,
      email: this.user.email,
      idUser: this.user.idLogin
    }
    this._service.sendmail(user).subscribe(
      data => {
        let res:any = data; 
        console.log(
          `👏 > 👏 > 👏 > 👏 mail has been sent and the message id is ${res.messageId}`
        );
        this._router.navigate(['/receivingEmail', this.user.idLogin]);
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttionText = "Submit";
      },() => {
        this.loading = false;
        this.buttionText = "Submit";
      }
    );
  }

}

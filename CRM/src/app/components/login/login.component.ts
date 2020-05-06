import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loginFailed: boolean = false;

  constructor(private _fb: FormBuilder, private _service: AuthenticationService, private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      username:['', [Validators.required]],
      password:['', Validators.required]
    });
  }

  onSubmit(){
    console.log(this.loginForm.value);
    this._service.login(this.loginForm.value).subscribe(
      res => { 
        console.log(res);
        this._router.navigate(['/home']);
      },
      err => { 
        console.log(err); 
        this.loginFailed=true;
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as users from './../../assets/data/user_data.json';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FailedloginComponent } from './failedlogin/failedlogin.component';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { LocalStorageService} from './../services/local-storage.service' 

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  //variables to store and validate data
  username: String = '';
  password: String = '';
  userdata: any = (users as any).default;
  form: FormGroup;
  loading = false;

  constructor(
    public router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) {
    this.form = this.formBuilder.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
  }

  ngOnInit(): void {
    }

  //submit function to validate login credentials
  onSubmit() {
    console.log(this.f.username.value, this.f.password.value);

    //getting user from json on basis on username
    const user = this.userdata.filter(
      (customer: { user: string; password: string }) =>
        customer.user == this.f.username.value && this.f.password.value == customer.password
    );
    console.log(user, typeof(user), user.length,"user")
    //checking user and validating password
    if (user.length!=0) {
      this.localStorageService.setItem('username',this.f.username.value);
      this.openPage();
    } else if(this.f.username.value!='' && this.f.password.value!='') {
      this.openSnackBar();
    }
  }
  openSnackBar() {
    this._snackBar.openFromComponent(FailedloginComponent, {
      duration: 5 * 1000,
    });
  }
  //routing function
  openPage() {
    this.router.navigate(['home']);
  }

  
 get f() { return this.form.controls; }

  

}

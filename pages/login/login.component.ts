 import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  status:string='';
  msg: string = '';

  loginData = {
    username: '',
    password: ''
  };

  constructor(private loginService: LoginService,private router:Router) {}

  checkLogin() {
    console.log(this.loginData);

    this.loginService.verifyLogin(this.loginData).subscribe(
      (response: any) => {
        if (response.msg === 'Login Successful') {
          this.msg = 'Login Successful!';
          //this.status='success';
          this.router.navigateByUrl('dashboard');
        } else {
          this.status='invalid';
          this.msg = 'Invalid Username/Password';
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.msg = 'An error occurred during login. Please try again later.';
      }
    );
  }
}

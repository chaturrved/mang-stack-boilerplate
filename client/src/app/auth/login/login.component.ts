import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { CreateUserInput } from 'src/generated-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private readonly loginService: LoginService, private readonly router: Router) {}

  login(loginUserData: CreateUserInput){
    this.loginService.login(loginUserData).subscribe(()=>{
      this.router.navigate(['/']);
    });
  }
}

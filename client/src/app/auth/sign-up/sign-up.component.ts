import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserGQL, CreateUserInput } from 'src/generated-types';
import { LoginService } from '../login/login.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  constructor(
    private readonly createUserGql: CreateUserGQL,
    private readonly router: Router,
    private readonly loginService: LoginService
  ) {}

  signUp(createUserData: CreateUserInput) {
    this.createUserGql
      .mutate({createUserData})
      .pipe(
        concatMap(() => {
          return this.loginService.login(createUserData);
        })
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}

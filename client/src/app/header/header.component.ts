import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;  

  constructor(private readonly authService: AuthService) {
    this.isLoggedIn$ = this.authService.authenticated$;
  }

  onLogout(){
    this.authService.logout();
  }

}

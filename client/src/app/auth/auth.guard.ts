import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private readonly authService: AuthService, private router: Router) {}

    canActivate(){
        return this.authService.isAuthenticated().pipe(
            tap((authenticated) => {
                if(!authenticated) {
                    this.router.navigate(['/login']);
                }
            })
        );
    }
}

export const GuardsDown : CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthGuard).canActivate();
};
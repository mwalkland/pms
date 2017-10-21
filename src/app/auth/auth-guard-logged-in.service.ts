import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
/**
 * This is a guard for not being able to access the login/signup page once the user is already logged in
 */
export class AuthGuardLoggedIn implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn().map(response => {
      if (response['valid']) {
        this.router.navigate(['']);
        return false;
      }
      return true;
    })
  }
}
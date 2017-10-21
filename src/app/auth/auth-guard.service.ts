import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
/**
 * This is a guard for not being able to access a page unless the user is logged in
 */
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn().map(response => {
      if (response['valid']) {
        return true;
      } else {
        localStorage.clear();
        this.router.navigate(['/auth']);
        return false;
      }
    })

  }
}
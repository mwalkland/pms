import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
/**
 * This is a guard for not being able to access a page unless the user is logged in
 */
export class TypeGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      this.router.navigate(['/auth']);
    } else if (user.type === 'student') {
      this.router.navigate(['/student']);
    } else if (user.type === 'staff') {
      this.router.navigate(['/staff']);
    }
    return true;
  }
}
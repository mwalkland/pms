import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()

export class StudentGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.type === 'student') {
        return true;
    } else {
        this.router.navigate(['/']);
        return false;
    }
  }
}
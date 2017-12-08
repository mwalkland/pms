import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()

export class StudentGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(route)
    if (localStorage.getItem('type') === 'student') {
        return true;
    } else {
        this.router.navigate(['/']);
        return false;
    }
  }
}
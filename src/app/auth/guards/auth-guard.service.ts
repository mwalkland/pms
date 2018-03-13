import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ExpiredComponent } from '../expired/expired.component';

@Injectable()
/**
 * This is a guard for not being able to access a page unless the user is logged in
 */
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private dialog: MatDialog) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      if (this.router.url !== '/') {
        this.dialog.open(ExpiredComponent);
        return false;
      } else {
        this.authService.logout();
        return false;
      }
    }
  }
}
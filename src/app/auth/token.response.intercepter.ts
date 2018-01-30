import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ExpiredComponent } from './expired/expired.component';
import { Router } from '@angular/router';

@Injectable()
export class TokenResponseInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do nothing
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 && this.router.url !== '/auth') {
          this.dialog.open(ExpiredComponent)
        }
      }
    })
  }
}
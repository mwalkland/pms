import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injector } from '@angular/core';

@Injectable()
export class TokenRequestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const url = 'http://emps-ugproj2-vm.ex.ac.uk:3000'
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
      url: url + request.url
    });
    return next.handle(request);
  }
}
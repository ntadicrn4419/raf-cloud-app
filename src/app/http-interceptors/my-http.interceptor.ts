import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('auth/login')) {
      return next.handle(request);
    }
    const jwt_token = localStorage.getItem('jwt_token');
    const authReq = request.clone({
      setHeaders: { Authorization: 'Bearer ' + jwt_token! },
    });
    return next.handle(authReq);
  }
}

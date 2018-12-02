import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './app-services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    if (authToken === '') {
       // const request = req.clone({});
        // return next.handle(request);
        return next.handle(req);
    } else {
        if  (req.headers.get('Authorization')) {
            return  next.handle(req);
        }

        const request = req.clone({
            headers: req.headers.set('Authorization', authToken)
          });
        return next.handle(request);
    }
  }
}

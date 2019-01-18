import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {MatDialog} from '@angular/material';
import {ErrorComponent} from './error/error.component';
import {Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private dialog: MatDialog,
        public toasterService: ToastrService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            // tap(evt => {
            //     if (evt instanceof HttpResponse) {
            //         if (evt.body && evt.body.success) {
            //             this.toasterService.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-bottom-center' });
            //         }
            //     }
            // }),
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                let errorMessage = 'An unknown error occurred!';
                if (error.message) {
                    errorMessage = error.message;
                }
                // Need to fix this
                // this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
                try {
                    this.toasterService.error('Error', errorMessage, { positionClass: 'toast-bottom-center' });
                } catch (e) {
                    this.toasterService.error('An error occured', '', { positionClass: 'toast-bottom-center' });
                }

                return throwError(error);
            })
        );
    }
}

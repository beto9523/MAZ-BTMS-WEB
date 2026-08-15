import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from '@Services/notifications/notification.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '@Services/spinner/spinner.service';
import { UserService } from '@Services/user/user.service';
import { getCookie } from 'typescript-cookie';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService, private router: Router, private spinner: SpinnerService, private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = getCookie('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    this.spinner.show();

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinner.hide();
        }
      }),

      catchError((error: HttpErrorResponse) => {
        this.spinner.hide();
        let errorMessage = 'An error occurred';
        let title = 'Error';

        //SSR Error
        if(error?.error?.message === 'fetch failed')
        return of();

        //Authentication error
        if (error.status === 401) {
          //Redirect to login
          this.notificationService.showInfo('You need to be authenticated to perform this action.',
          'Authentication Required');

          setTimeout(() => {
           this.userService.logOut();
           this.router.navigateByUrl('/login');
         }, 5000);
         return of();
        }

        //Server side Janus Error Response
        else if(error.error != null && 'ResponseMessage' in error?.error) {
          // Server-side error
          errorMessage = `${error.error.ResponseMessage}`;
          title = `Error`
        }

        //Bad request Error
        else if(error.status === 400){
          title = `Data Error`
          errorMessage = `The request has missing data.`;
        }

        //Not found Error
        else if(error.status === 404){
          title = `404 Error`
          errorMessage = `The resource does not exist.`;
        }

        //Http method not allowed
        else if(error.status === 405){
          title = `Error`
          errorMessage = `The http method is wrong.`;
        }

        //Any Else Error
        else {

          title = `Connection Error`
          errorMessage = `No connection with the server, try again later.`;

        }

        this.notificationService.showError(errorMessage, title);
        return of();

      })
    );
  }
}

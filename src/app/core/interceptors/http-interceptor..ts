import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService, SpinnerService } from '../services';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private spinnerService: SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    request = this.addAuthHeader(request);

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinnerService.hide();
        }
      }),
      catchError((error: HttpErrorResponse) => this.handleResponseError(error, request, next))
    );
  }

  handleResponseError(error: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (error.status === 401) {
      this.authService.logout();
    }

    this.spinnerService.hide();
    return throwError(error);
  }

  addAuthHeader(request: HttpRequest<any>): HttpRequest<any> {
    const token = sessionStorage.getItem('token');
    const isUserLoggedIn = sessionStorage.getItem('isUserLogIn') === 'true';

    if (token && isUserLoggedIn) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}`, RequesterName: this.getUserEmail()! }
      });
    }
    return request;
  }

  private getUserEmail(): string | null {
    return this.authService.getUserEmail();
  }
}

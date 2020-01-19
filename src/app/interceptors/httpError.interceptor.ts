import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
  HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorAlertHandlingService } from './../services/errorAlertHandling.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorAlertHandlingService: ErrorAlertHandlingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
            if (error.status == 0) {
              //We probably exceeded our api calls allowance to AccuWeather 
              //unable to see the exact cause of the error. probably because of accueweather settings.
              //see first answer here https://stackoverflow.com/questions/47180634/i-get-http-failure-response-for-unknown-url-0-unknown-error-instead-of-actu/48902894
              this.errorAlertHandlingService.addErrorHandling(error);
            }
          }
          return throwError(errorMessage);
        })
      )
  }
}
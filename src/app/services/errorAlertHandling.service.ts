import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IOurError} from "./../models/ourError"
@Injectable({
  providedIn: 'root'
})
export class ErrorAlertHandlingService {

  private errorSource = new BehaviorSubject<IOurError[]>([]);
  errorObj = this.errorSource.asObservable()


  constructor() { }

  addErrorHandling(err) {
    let currentErrArray: IOurError[] = this.errorSource.getValue();
    if (!Array.isArray(currentErrArray)) return;
    
    let ourErr = {
      errorCustomCode: "probablyApiCallsExceeded",
      errorCustomMsg: "We probably exceeded our api calls allowance to AccuWeather. Please change the api code or try again later.",
      errorObject: err
    }
    
    if (currentErrArray.find(element => element.errorCustomCode === ourErr.errorCustomCode)) return;
    
    currentErrArray.push(ourErr);
    this.errorSource.next(currentErrArray);
  }

  removeErr() {
    let currentErrArray: IOurError[] = this.errorSource.getValue();
    if (!Array.isArray(currentErrArray)) return;

    currentErrArray.splice(0, 1);
    this.errorSource.next(currentErrArray);
  }

}

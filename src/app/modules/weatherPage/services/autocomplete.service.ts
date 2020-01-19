import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ICityAutocomplete } from '../models/cityAutocomplete';
import { environment } from '../../../../environments/environment';
import { StorageService } from './../../../services/storage.service';
import { ErrorAlertHandlingService } from './../../../services/errorAlertHandling.service';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  autocompleteUrl = `${environment.autocompleteBaseUrl}apikey=${environment.apikey}`;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private errorAlertHandlingService: ErrorAlertHandlingService
  ) { }

  getCityAutocomplete(q: string): Observable<ICityAutocomplete[]> {

    let autocompleteCache: boolean | ICityAutocomplete[] = this.storageService.getStorage(`autocompleteStorage-${q}`, "local", 60 * 60 * 24);
    if (autocompleteCache) {
      return of(<ICityAutocomplete[]>autocompleteCache);
    }
    return this.http.get<ICityAutocomplete[]>(`${this.autocompleteUrl}&q=${q}`)
      .pipe(
        catchError((err) => {
          this.errorAlertHandlingService.addErrorHandling(err);
          return throwError(err)
        }),
        tap(value => {
          this.storageService.setStorage(`autocompleteStorage-${q}`, value, "local", true);
        })
      );
  }
}

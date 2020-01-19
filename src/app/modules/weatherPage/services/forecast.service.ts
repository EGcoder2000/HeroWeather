import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IForecast } from '../models/forecast';
import { environment } from '../../../../environments/environment';
import { StorageService } from './../../../services/storage.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  cityForecastUrl = `${environment.forecastBaseUrl}apikey=${environment.apikey}`;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  getCityForecast(cityKey: string): Observable<IForecast> {

    let forecastCache: boolean | IForecast = this.storageService.getStorage(`forecast-${cityKey}`, "session", 60 * 60, true);
    if (forecastCache) {
      return of(<IForecast>forecastCache);
    }
    return this.http.get<IForecast>(`${this.cityForecastUrl}&locationKey=${cityKey}`)
      .pipe(tap(value => {
        this.storageService.setStorage(`forecast-${cityKey}`, value, "session", true, true);
      }));
  }
}

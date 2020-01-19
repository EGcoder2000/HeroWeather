import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ICurrentWeather } from '../models/currentWeather';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  cityCurrentWeatherUrl = `${environment.currentWeatherBaseUrl}apikey=${environment.apikey}`;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  getCityCurrentWeather(cityKey: string): Observable<ICurrentWeather> {

    let currentWeatherCache: boolean | ICurrentWeather = this.storageService.getStorage(`currentWeather-${cityKey}`, "session", 60 * 60, true);

    if (currentWeatherCache) return of(<ICurrentWeather>currentWeatherCache)

    return this.http.get<ICurrentWeather[]>(`${this.cityCurrentWeatherUrl}&locationKey=${cityKey}`)
      .pipe(
        map((currentWeather: ICurrentWeather[]): ICurrentWeather => currentWeather[0]),
        tap(value => {
          this.storageService.setStorage(`currentWeather-${cityKey}`, value, "session", true, true);
        })
      );
  }
}

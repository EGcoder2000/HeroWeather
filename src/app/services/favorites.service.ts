import { Injectable } from '@angular/core';

import { Observable, Subscription, forkJoin, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ICurrentWeather } from './../models/currentWeather';
import { ICityAutocomplete } from './../modules/weatherPage/models/cityAutocomplete';
import { IFavoritesCurrentWeather } from './../modules/favoritesPage/models/favoritesCurrentWeather'

import { StorageService } from './storage.service';
import { SharedFunctionsService } from './sharedFunctions.service';
import { CurrentWeatherService } from './currentWeather.service';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites: ICityAutocomplete[] = this.storageService.getStorage(`favoritesArray`) || [];

  constructor(
    private currentWeatherService: CurrentWeatherService,
    private storageService: StorageService,
    private sharedFunctionsService: SharedFunctionsService
  ) { }

  addToFavorites(cityObj: ICityAutocomplete): void {
    let index = this.favorites.findIndex(x => x.Key == cityObj.Key);
    if (index < 0) {
      this.favorites.push(cityObj);
      this.storageService.setStorage(`favoritesArray`, this.favorites);
    }
  }

  deleteFromFavorites(cityObj: ICityAutocomplete): void {
    this.favorites = this.favorites.filter(value => value.Key !== cityObj.Key);
    this.storageService.setStorage(`favoritesArray`, this.favorites);
  }

  getFavorites(): ICityAutocomplete[] {
    return this.favorites;
  }

  isFavorite(cityObj: ICityAutocomplete): boolean {
    let index = this.favorites.findIndex(x => x.Key == cityObj.Key);
    return (index < 0) ? false : true;
  }

  getFavoritesCurrentWeather(): Observable<IFavoritesCurrentWeather[]> {
    
    let favoritesCurrentWeatherCache: boolean | any = this.storageService
      .getStorage(`favoritesCurrentWeather`, "session", 60 * 60, true);

    let isCacheAvailable = (): boolean => {
      if (!favoritesCurrentWeatherCache) return false;

      let isFavArraysHaveTheSameContent = (array1, array2): boolean => {
        return array1.every((element, index) => {
          return array2.find(x => x.city.Key === element.Key) ? true : false;
        })
      }

      if (
        (this.sharedFunctionsService.isArrayEmpty(favoritesCurrentWeatherCache))
        || (favoritesCurrentWeatherCache.length != this.favorites.length)
        || (!isFavArraysHaveTheSameContent(this.favorites, favoritesCurrentWeatherCache))
      ) {
        return false;
      }

      return true;
    }

    if (isCacheAvailable()) return of(favoritesCurrentWeatherCache);

    let arrayBatch = [];
    this.favorites.forEach((cityObj, index) => {
      arrayBatch.push(
        this.currentWeatherService.getCityCurrentWeather(cityObj.Key)
          .pipe(
            map((currentWeatherValues: ICurrentWeather) => {
              return {
                city: cityObj,
                currentWeather: currentWeatherValues
              }
            })
          )
      )
    });

    if (this.sharedFunctionsService.isArrayEmpty(arrayBatch)) {
      return of([])
        .pipe(
          tap((value) => {
            this.storageService.setStorage(`favoritesCurrentWeather`, value, "session", true, true);
          })
        )
    }

    return forkJoin(arrayBatch).pipe(
      tap((value) => {
        this.storageService.setStorage(`favoritesCurrentWeather`, value, "session", true, true);
      }));
  }
}

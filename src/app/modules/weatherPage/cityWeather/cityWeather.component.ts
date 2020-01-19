import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription, forkJoin, throwError } from 'rxjs';
import { pluck, distinctUntilChanged, tap, take, finalize, catchError } from 'rxjs/operators';

import { ICityAutocomplete } from './../models/cityAutocomplete';
import { IForecast } from './../models/forecast';
import { ICurrentWeather } from './../../../models/currentWeather';
import { ISettings } from './../../../models/settings';

import { ForecastService } from './../services/forecast.service';
import { CurrentWeatherService } from '../../../services/currentWeather.service';
import { FavoritesService } from '../../../services/favorites.service';
import { SharedFunctionsService } from '../../../services/sharedFunctions.service';
import { SettingsService } from './../../../services/settings.service';
import { StorageService } from './../../../services/storage.service';

import { LoadingComponent } from './../../shared/components/loading/loading.component';

import * as moment from 'moment';

@Component({
    selector: 'app-cityWeather',
    templateUrl: './cityWeather.component.html',
    styleUrls: ['./cityWeather.component.scss']
})

export class CityWeatherComponent implements OnInit {

    subscription: Subscription = new Subscription();

    settings: ISettings;
    cityForecast: IForecast;
    cityCurrentWeather: ICurrentWeather;
    currentCity: ICityAutocomplete;

    isFavorite: boolean;
    doneLoadingImages: boolean;
    doneLoadingWeatherData: boolean;
    doneLoadingDelay: boolean;
    loadingDelayTime: number = 1000;

    imageToLoadIds: string[];
    settingUnit: string;

    constructor(
        private forecastService: ForecastService,
        private currentWeatherService: CurrentWeatherService,
        private favoritesService: FavoritesService,
        public sharedFunctionsService: SharedFunctionsService,
        private settingsService: SettingsService,
        private storageService: StorageService
    ) { }

    ngOnInit() {
        setTimeout(() => { this.doneLoadingDelay = true }, this.loadingDelayTime);
        this.subscription.add(this.settingsService.settings
            .pipe(
                pluck("unit"),
                distinctUntilChanged()
            )
            .subscribe(unit => {
                this.settingUnit = unit;
            }));
        this.subscription.add(this.settingsService.settings
            .pipe(
                pluck("city"),
                distinctUntilChanged()
            )
            .subscribe(cityObj => {
                this.doneLoadingDelay = false;
                setTimeout(() => { this.doneLoadingDelay = true }, this.loadingDelayTime);
                this.imageToLoadIds = this.imagesToLoad();
                this.doneLoadingImages = false;
                this.doneLoadingWeatherData = false;
                this.currentCity = cityObj;
                this.isFavorite = this.favoritesService.isFavorite(this.currentCity);
                this.subscription.add(
                    forkJoin([
                        this.currentWeatherService.getCityCurrentWeather(this.currentCity.Key).pipe(
                            take(1),
                            tap((currentWeatherObj => {
                                this.cityCurrentWeather = currentWeatherObj;
                            }))
                        ),
                        this.forecastService.getCityForecast(this.currentCity.Key).pipe(
                            take(1),
                            tap((forecastObj => {
                                this.cityForecast = forecastObj;
                            }))
                        )
                    ])
                        .pipe(
                            take(1),
                            finalize(() => { this.doneLoadingWeatherData = true })
                        )
                        .subscribe(
                            () => { },
                            err => {
                                this.cityForecast = null;
                                this.cityCurrentWeather = null;
                                this.doneLoadingImages = true;
                            },
                            () => {
                                this.doneLoadingWeatherData = true;
                            }
                        ));
            }));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onFavoriteClick(action: string): void {
        if (action === "add") {
            this.favoritesService.addToFavorites(this.currentCity);
        } else if (action === "delete") {
            this.favoritesService.deleteFromFavorites(this.currentCity);
        } else {
            return;
        }
        this.isFavorite = this.favoritesService.isFavorite(this.currentCity);
    }

    onUnitChange(unitValue: string): void {
        this.settingsService.changeSettings({ unit: unitValue });
    }

    onImageLoad(id: string): void {
        this.imageToLoadIds = this.imageToLoadIds.filter(value => value !== id);

        if (this.sharedFunctionsService.isArrayEmpty(this.imageToLoadIds)) {
            this.doneLoadingImages = true;
        }
    }

    imagesToLoad(): string[] {
        return [
            "currentWeatherImg",
            "forecastWeatherImg-1",
            "forecastWeatherImg-2",
            "forecastWeatherImg-3",
            "forecastWeatherImg-4",
            "forecastWeatherImg-5"
        ]
    }
}

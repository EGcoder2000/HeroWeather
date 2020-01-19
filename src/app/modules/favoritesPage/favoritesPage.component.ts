import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import { SettingsService } from './../../services/settings.service';
import { StorageService } from './../../services/storage.service';
import { SharedFunctionsService } from '../../services/sharedFunctions.service';
import { FavoritesService } from '../../services/favorites.service';

import { IFavoritesCurrentWeather } from './models/favoritesCurrentWeather'

import { LoadingComponent } from './../shared/components/loading/loading.component';

@Component({
  selector: 'app-favoritesPage',
  templateUrl: './favoritesPage.component.html',
  styleUrls: ['./favoritesPage.component.scss']
})
export class FavoritesPageComponent implements OnInit {

  favoritesCurrentWeather: IFavoritesCurrentWeather[] = [];
  favoritesImageIds: string[] = [];
  doneLoadingDelay: boolean = false;
  loadingDelayTime: number = 1000;
  doneLoadingImages: boolean = false;
  subscription: Subscription = new Subscription();
  settingUnit: string;

  constructor(
    private favoritesService: FavoritesService,
    public sharedFunctionsService: SharedFunctionsService,
    private route: ActivatedRoute,
    private _router: Router,
    private settingsService: SettingsService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    setTimeout(() => { this.doneLoadingDelay = true }, this.loadingDelayTime);
    this.subscription.add(this.favoritesService.getFavoritesCurrentWeather().subscribe(res => {
      this.favoritesCurrentWeather = res;
      this.favoritesCurrentWeather.forEach((element, index) => {
        this.favoritesImageIds.push(`favoriteImage-${index + 1}`);
      });
      if (this.sharedFunctionsService.isArrayEmpty(this.favoritesImageIds)) {
        this.doneLoadingImages = true;
      }
    }
    ));

    this.subscription.add(this.settingsService.settings
      .pipe(
        pluck("unit"),
        distinctUntilChanged()
      )
      .subscribe(res => {
        this.settingUnit = res;
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  redirectToCity(cityKey: string) {
    let favoritesArray = this.favoritesService.getFavorites();
    let index = favoritesArray.findIndex(x => x.Key == cityKey);
    if (index >= 0) this.settingsService.changeSettings({ city: favoritesArray[index] });
    this._router.navigate(['/']);
  }

  onImageLoad(id: string) {
    this.favoritesImageIds = this.favoritesImageIds.filter(value => value !== id);
    if (this.sharedFunctionsService.isArrayEmpty(this.favoritesImageIds)) {
      this.doneLoadingImages = true;
    }
  }
}

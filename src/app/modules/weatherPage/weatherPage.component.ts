import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { ICityAutocomplete } from './models/cityAutocomplete';

import { AutocompleteService } from './services/autocomplete.service';
import { StorageService } from './../../services/storage.service';
import { SettingsService } from './../../services/settings.service';

import * as moment from 'moment';

@Component({
  selector: 'app-weatherPage',
  templateUrl: './weatherPage.component.html',
  styleUrls: ['./weatherPage.component.scss']
})
export class WeatherPageComponent implements OnInit {

  textSearch: string = "";
  keyword: string = 'LocalizedName';
  placeholderText: string = "Where would you like to go?";
  cities: ICityAutocomplete[] = [];

  constructor(
    private autocompleteService: AutocompleteService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
  }

  getAutocomplete(): void {
      this.autocompleteService.getCityAutocomplete(this.textSearch).subscribe(res => {
        this.cities = res;
      });
  }

  selectEvent(item: object): void {
    this.settingsService.changeSettings({city: item});
  }

  onChangeSearch(val: string): void {
    this.textSearch = val;
    if (this.textSearch) {
      this.getAutocomplete();
    }
  }

  onFocused(e) {
    // do something when input is focused
  }

}

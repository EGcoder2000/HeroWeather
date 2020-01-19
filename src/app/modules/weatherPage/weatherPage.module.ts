import { NgModule } from '@angular/core';
import {SharedModule} from './../shared/shared.module';

import { WeatherPageRoutingModule } from './weatherPage-routing.module';
import { WeatherPageComponent } from './weatherPage.component';
import { CityWeatherComponent } from './cityWeather/cityWeather.component';
import { AutocompleteService } from './services/autocomplete.service';
import { CurrentWeatherService } from './../../services/currentWeather.service';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';


@NgModule({
  declarations: [
    WeatherPageComponent, 
    CityWeatherComponent,  ],
  providers:[
    AutocompleteService
  ],
  imports: [
    AutocompleteLibModule,
    SharedModule,
    WeatherPageRoutingModule
  ]
})
export class WeatherPageModule { }

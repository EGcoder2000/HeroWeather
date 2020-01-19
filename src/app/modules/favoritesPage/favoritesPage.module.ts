import { NgModule } from '@angular/core';
import {SharedModule} from './../shared/shared.module';

import { FavoritesPageRoutingModule } from './favoritesPage-routing.module';
import { FavoritesPageComponent } from './favoritesPage.component';


@NgModule({
  declarations: [
    FavoritesPageComponent
  ],
  imports: [
    SharedModule,
    FavoritesPageRoutingModule
  ]
})
export class FavoritesPageModule { }

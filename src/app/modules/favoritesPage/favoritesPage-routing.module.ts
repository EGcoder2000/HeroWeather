import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritesPageComponent } from './favoritesPage.component';

const routes: Routes = [{ path: '', component: FavoritesPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesPageRoutingModule { }

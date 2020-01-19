import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherPageComponent } from './weatherPage.component';

const routes: Routes = [
  { path: '', pathMatch: "full",component: WeatherPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherPageRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: "full", loadChildren: () => import('./modules/weatherPage/weatherPage.module').then(m => m.WeatherPageModule) },
  { path: 'favorites', loadChildren: () => import('./modules/favoritesPage/favoritesPage.module').then(m => m.FavoritesPageModule) },
  {path: '**', redirectTo: '/'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

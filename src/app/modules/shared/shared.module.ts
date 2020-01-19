import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {TemperatureConvertor} from './pipes/temperatureConvertor.pipe';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    TemperatureConvertor,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CommonModule,
    HttpClientModule,
    TemperatureConvertor,
    LoadingComponent
  ]
})
export class SharedModule { }

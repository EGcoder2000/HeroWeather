import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ErrorAlertHandlingService } from './services/errorAlertHandling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weatherApp';
  errorsToDisplay: any =  []
  errorMsg = "";
  constructor(private errorAlertHandlingService: ErrorAlertHandlingService){
  }
  ngOnInit() {
    this.errorAlertHandlingService.errorObj.subscribe(res => {
      this.errorsToDisplay = res;
      this.errorMsg = this.errorsToDisplay[0] ? this.errorsToDisplay[0].errorCustomMsg : ""; 
    });
  }  

}

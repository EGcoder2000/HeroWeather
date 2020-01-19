import { Component, OnInit, Input } from '@angular/core';
import { ErrorAlertHandlingService } from './../../services/errorAlertHandling.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(private errorAlertHandlingService: ErrorAlertHandlingService) { }

  @Input() errorMsg;
  ngOnInit() {
  }

  onClose() {
    this.errorAlertHandlingService.removeErr();
  }
}

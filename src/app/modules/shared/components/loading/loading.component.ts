import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  doneLoadingImages: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onImageLoad(){
    this.doneLoadingImages = true;    
  }

}

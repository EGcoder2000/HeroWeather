import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionsService {

  constructor() { }

  getWeekday(timestamp:number):string {
    return moment(timestamp,"X").format("ddd");
  }

  getIconPath(iconNumber:string | number):string {
    iconNumber = iconNumber.toString().padStart(2, '0');
    return `assets/images/${iconNumber}-s.png`;
  }

  isArrayEmpty(array: any[]):boolean {
    return !Array.isArray(array) || !array.length
  }

  isObjectEmpty(obj: object):boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object
  }

}

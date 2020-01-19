import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setStorage (storageName: string, storageValue: any, storageType: string = "local", 
              saveTimestamp: boolean = false ,saveDateInName : boolean = false) : void
  {
    let storage = (storageType === "local") ? localStorage : sessionStorage;
    let name: string = storageName;
    name += (saveDateInName) ? `-${moment().format("YYYY-MM-DD")}`: "";
    storage.setItem(name, JSON.stringify(storageValue));
    if (saveTimestamp){
      storage.setItem(`${name}-savedTimestamp`, JSON.stringify(moment().unix()));
    }
  }

  getStorage (storageName: string, storageType: string = "local", 
  expireInTimestamp: number = 0 ,isDateInName : boolean = false) : boolean | any
  {
    let name: string = storageName;
    name += (isDateInName) ? `-${moment().format("YYYY-MM-DD")}`: "";

    if (!this.isStorageAvailable(name, storageType, expireInTimestamp)) return false;

    let storage = (storageType === "local") ? localStorage : sessionStorage;
    return JSON.parse(storage.getItem(name));
  }

  isStorageAvailable (storageName: string, storageType: string = "local", expireInTimestamp: number = 0) : boolean{
    
    let storage = (storageType === "local") ? localStorage : sessionStorage;
    let storageValue = storage.getItem(storageName);

    if (!storageValue) return false;

    if (expireInTimestamp > 0){
      let storageSavedTimestamp = storage.getItem(`${storageName}-savedTimestamp`);
      if (!storageSavedTimestamp) return false;
      storageSavedTimestamp = JSON.parse(storageSavedTimestamp);
      let expirationTimestamp = moment(storageSavedTimestamp,"X").add(expireInTimestamp,"s").unix();
      let currentTimestamp = moment().unix()
      if ( expirationTimestamp < currentTimestamp) {
        this.removeFromStorage(`${storageName}`);
        this.removeFromStorage(`${storageName}-savedTimestamp`);
        return false
      };
    }
    return true;
  }

  removeFromStorage(storageName: string, storageType: string = "local"):void{
    let storage = (storageType === "local") ? localStorage : sessionStorage;
    storage.removeItem('storageName');
  }

  clearLocalStorage():void{
    localStorage.clear();
  }

  clearSessionStorage():void{
    sessionStorage.clear();
  }

  clearStorage():void{
    localStorage.clear();
    sessionStorage.clear();
  }

}

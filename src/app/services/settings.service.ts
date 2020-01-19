import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { StorageService } from './storage.service';
import { ISettings } from './../models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settingsSource = new BehaviorSubject<ISettings>(this.getInitSettings());
  settings = this.settingsSource.asObservable()

  constructor(
    private storageService: StorageService
  ) { }

  changeSettings(newSetting: object) {
    let newSettingsObj: ISettings = { ...this.settingsSource.getValue(), ...newSetting };
    this.storageService.setStorage(`settings`, <ISettings>newSettingsObj);
    this.settingsSource.next(<ISettings>newSettingsObj);
  }

  getInitSettings(): ISettings {
    let settingsFromStorage: ISettings = this.storageService.getStorage(`settings`);

    if (settingsFromStorage) return settingsFromStorage;

    let defaultSettings: ISettings = {
      unit: 'C',
      city: {
        "Version": 1,
        "Key": "215854",
        "Type": "City",
        "Rank": 31,
        "LocalizedName": "Tel Aviv",
        "Country": {
          "ID": "IL",
          "LocalizedName": "Israel"
        },
        "AdministrativeArea": {
          "ID": "TA",
          "LocalizedName": "Tel Aviv"
        }
      },
    };
    this.storageService.setStorage(`settings`, defaultSettings);
    return defaultSettings;
  }
}

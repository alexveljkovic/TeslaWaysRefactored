import { Injectable } from '@angular/core';
import {StorageService} from '../storage-service/storage.service';
import {Events} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private loadedConfig: any = null;
  private defaultConfig: any = {
      language: 'en',
  };

  constructor(
      private storageService: StorageService,
      private events: Events) {
    this.init();
  }

  async init() {
    const res = await this.storageService.getValue('config');
    if (!res) {
        this.storageService.setValue('config', this.defaultConfig);
        this.loadedConfig = this.defaultConfig;
    } else {
      this.loadedConfig = res;
      this.configChanged();
    }
  }

  getParams() {
    return this.loadedConfig || this.defaultConfig;
  }

  setParam(key, value) {
      this.loadedConfig[key] = value;
      this.storageService.setValue('config', this.loadedConfig);
      this.configChanged();
  }

  configChanged() {
      console.log('Changing config params');
      this.events.publish('config-update', this.loadedConfig);
  }

}

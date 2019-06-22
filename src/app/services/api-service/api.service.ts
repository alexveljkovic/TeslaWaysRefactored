import { Injectable } from '@angular/core';

import {AlertsService} from '../alert-service/alerts.service';
import * as firebase from 'firebase';
import {StorageService} from '../storage-service/storage.service';

const DEVELOPMENT = false;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
      private alertsService: AlertsService,
      private storageService: StorageService,
              ) { }

  // GET API call call to URL
    GetData(path) {
      const isOnline = navigator.onLine;
      if (!isOnline) {
          const res = this.storageService.getValue(path);
          if (!res) {
              this.alertsService.displayError('No internet connection', 'You need to be online to load data!');
          } else {
              return res;
          }
      }
      const ref = firebase.database().ref(path);

      console.log('GET:', path);
      return new Promise((resolve, reject) => {
          ref.on('value', resp => {
              this.storageService.setValue('path', resp).then(() => {
                  resolve(resp.val());
              }).catch((err) => {
                  this.alertsService.displayError('Looks like we have some problems storing the data', 'Try again later');
                  console.log(err);
                  reject(err);
              });
          });
      });

  }
}

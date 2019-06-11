import { Injectable } from '@angular/core';
import {AlertsService} from '../alert-service/alerts.service';
import * as firebase from 'firebase';

const DEVELOPMENT = false;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(alertsService: AlertsService) { }

  // GET API call call to URL
    GetData(path) {
      const ref = firebase.database().ref(path);

      // TODO: Check connection
      console.log('GET:', path);
      return new Promise((resolve, reject) => {
          ref.on('value', resp => {
              resolve(resp.val());
          });
      });

  }
}

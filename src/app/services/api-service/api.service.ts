import { Injectable } from '@angular/core';
import axios from 'axios';
import {AlertsService} from '../alert-service/alerts.service';

const DEVELOPMENT = false;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(alertsService: AlertsService) { }

  // GET API call call to URL
    GetData(url, params = {}) {
      if (DEVELOPMENT) {
          return new Promise((resolve, reject) => {
              resolve({data: 'data', message: 'Success'});
          });
      } else {
          // TODO: Check connection
          console.log('GET:', url);
          return axios.get(url, {
              headers: {
                  'Content-Type': 'application/json'
              },
          });
      }
  }
}

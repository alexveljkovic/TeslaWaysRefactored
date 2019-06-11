import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() {
  }

  getParams() {
    return {
        BASE_URL: 'https://jsonplaceholder.typicode.com',
    };
  }
}

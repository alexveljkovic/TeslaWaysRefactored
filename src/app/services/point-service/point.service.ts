import { Injectable } from '@angular/core';
import {ApiService} from '../api-service/api.service';
import {ConfigService} from '../config-service/config.service';
import {AlertsService} from '../alert-service/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  public res: any = {};

  constructor(
      private apiService: ApiService,
      private configService: ConfigService,
      private alertsService: AlertsService,
  ) { }

    async getPoints(limit = 0, country) {
      const { BASE_URL } = this.configService.getParams();
      try {
          console.log(BASE_URL);
          this.res = await this.apiService.GetData(`${BASE_URL}/comments`);

          if (limit !== 0) {
              return this.res.data.slice(0, limit);
          } else {
              return this.res.data;
          }

      } catch (err) {
          console.log(err);
          await this.alertsService.displayError('Locations fetching error', 'Unable to fetch locations');
      }
    }
}

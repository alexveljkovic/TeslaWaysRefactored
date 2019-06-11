import { Injectable } from '@angular/core';
import {ApiService} from '../api-service/api.service';
import {ConfigService} from '../config-service/config.service';
import {AlertsService} from '../alert-service/alerts.service';
import {UtilitiesService} from '../utilities-service/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public res: any = {};

  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
    private alertsService: AlertsService,
    private utilities: UtilitiesService) { }

  async getNews(limit = 0) {
    const { BASE_URL } = this.configService.getParams();
    try {
        console.log(BASE_URL);
        this.res = await this.apiService.GetData(`${BASE_URL}/posts`);

        if (limit !== 0) {
            return this.res.data.slice(0, limit);
        } else {
            return this.res.data;
        }

    } catch (err) {
      console.log(err);
      await this.alertsService.displayError('News fetching error', 'Unable to fetch news');
    }
  }

  async getFeaturedNews() {
      const { BASE_URL } = this.configService.getParams();
      try {
          console.log(BASE_URL);
          this.res = await this.apiService.GetData(`${BASE_URL}/posts/1`);

          return this.utilities.toArray(this.res.data);

      } catch (err) {
          console.log(err);
          await this.alertsService.displayError('News fetching error', 'Unable to fetch news');
      }
  }
}

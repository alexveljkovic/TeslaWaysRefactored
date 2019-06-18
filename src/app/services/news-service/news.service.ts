import {Injectable} from '@angular/core';
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
        private utilities: UtilitiesService) {
    }

    async getNews() {
        try {
            this.res = await this.apiService.GetData('news/');
            return this.res;

        } catch (err) {
            console.log(err);
            await this.alertsService.displayError('News fetching error', 'Unable to fetch news');
        }
    }

    async getFeaturedNews() {
        try {
            this.res = await this.apiService.GetData('featured/');

            return this.utilities.toArray(this.res);

        } catch (err) {
            console.log(err);
            await this.alertsService.displayError('News fetching error', 'Unable to fetch news');
        }
    }
}

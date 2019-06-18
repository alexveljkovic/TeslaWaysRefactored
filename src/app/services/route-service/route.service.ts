import { Injectable } from '@angular/core';
import {AlertsService} from '../alert-service/alerts.service';
import {ApiService} from '../api-service/api.service';
import {ConfigService} from '../config-service/config.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
    res: any = {};

    constructor(
        private apiService: ApiService,
        private configService: ConfigService,
        private alertsService: AlertsService,
    ) { }

    async getRoutes(limit = 0) {
        try {
            this.res = await this.apiService.GetData(`routes/`);

            if (limit !== 0) {
                return this.res.slice(0, limit);
            } else {
                return this.res;
            }

        } catch (err) {
            console.log(err);
            await this.alertsService.displayError('Route fetching error', 'Unable to fetch routes');
        }
    }
}

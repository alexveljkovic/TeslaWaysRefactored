import { Component } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ApiService} from '../services/api-service/api.service';
import {AlertsService} from '../services/alert-service/alerts.service';
import {NewsService} from '../services/news-service/news.service';

import {GameService} from '../services/game-service/game.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
      private navCtrl: NavController,
      private alertsService: AlertsService,
      private apiService: ApiService,
      private newsService: NewsService,
      private gameService: GameService,
  ) {}

  async gotoMap() {
    this.navCtrl.navigateForward('map');
    //   this.apiService.GetData('http://google.com').then((res) => {
    //     console.log(res);
    //   }).catch((err) => {
    //       console.log(err);
    //       console.log('Doslo je do greske!');
    //   });
      // this.alertsService.displayError('Moja greska', 'Neki njen tekst');
      // console.log(await this.newsService.getNews(7));
    //console.log(await this.newsService.getFeaturedNews());
    console.log(this.gameService.getClosestPoints(0, 0, 50));
  }




}

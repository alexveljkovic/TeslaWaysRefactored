import { Component, OnInit } from '@angular/core';
import {GameService} from '../services/game-service/game.service';
import {ConfigService} from '../services/config-service/config.service';
import {Events} from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  news: any = {};
  config: any = {};
  constructor(
      private gameService: GameService,
      private configService: ConfigService,
      private events: Events,
  ) {
      this.config = this.configService.getParams();

      this.events.subscribe('config-update', (update) => {
          this.config = update;
      });
  }

  ngOnInit() {
    this.news = this.gameService.getActiveNews();
  }

  changeLanguage() {
      if (this.config.language === 'en') {
          this.configService.setParam('language', 'sr');
      } else {
          this.configService.setParam('language', 'en');
      }
  }
}

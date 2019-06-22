import { Component, OnInit } from '@angular/core';
import {GameService} from '../services/game-service/game.service';
import {Events, Platform} from '@ionic/angular';
import {ConfigService} from '../services/config-service/config.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  location: any = {};
  config: any = {};
  constructor(
      private gameService: GameService,
      private platform: Platform,
      private configService: ConfigService,
      private events: Events,
  ) {
      this.config = this.configService.getParams();

      this.events.subscribe('config-update', (update) => {
          this.config = update;
      });
  }

  async ngOnInit() {
      await this.platform.ready();
      this.location = this.gameService.getActivePoint();
      console.log(this.location);
  }

  changeLanguage() {
    if (this.config.language === 'en') {
        this.configService.setParam('language', 'sr');
    } else {
        this.configService.setParam('language', 'en');
    }
}

}

import { Component, OnInit } from '@angular/core';
import {GameService} from '../services/game-service/game.service';
import {Platform} from '@ionic/angular';


@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  location: any = {};
  constructor(
      private gameService: GameService,
      private platform: Platform,
  ) {
  }

  async ngOnInit() {
      await this.platform.ready();
      this.location = this.gameService.getActivePoint();
      console.log(this.location);
  }

}

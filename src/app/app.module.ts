import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertsService } from './services/alert-service/alerts.service';
import { ApiService } from './services/api-service/api.service';
import { ConfigService } from './services/config-service/config.service';
import { GameService } from './services/game-service/game.service';
import { NewsService } from './services/news-service/news.service';
import { UtilitiesService} from './services/utilities-service/utilities.service';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './services/storage-service/storage.service';
import { PointService } from './services/point-service/point.service';
import { LocationService } from './services/location-service/location.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {MapService} from './services/map-service/map.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    AlertsService,
    ApiService,
    ConfigService,
    GameService,
    NewsService,
    UtilitiesService,
    StorageService,
    PointService,
    LocationService,
    Geolocation,
    MapService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

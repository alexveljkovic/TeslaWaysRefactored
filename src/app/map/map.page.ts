import { Component, OnInit } from '@angular/core';
import {Environment, GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, Marker} from '@ionic-native/google-maps/ngx';
import {AlertsService} from '../services/alert-service/alerts.service';
import {Platform} from '@ionic/angular';
import {LocationService} from '../services/location-service/location.service';
import {MapService} from '../services/map-service/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
    map: GoogleMap;
    currentPos: Coordinates;
    // currentPos: any;
  constructor(
      private alertsService: AlertsService,
      private platform: Platform,
      private mapService: MapService,
      private location: LocationService,
  ) { }

  async ngOnInit() {
      // TODO: Check connection
      await this.platform.ready();
      await this.mapService.loadMap();
      await this.location.pointLocation();
  }
    //
    // async loadMap() {
    //     // This code is necessary for browser
    //     /*
    //     Environment.setEnv({
    //         API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAfw3u7ZmqYhC6EXOsPLizVoYy00T9wn6M',
    //         API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAfw3u7ZmqYhC6EXOsPLizVoYy00T9wn6M',
    //     });*/
    //
    //   Environment.setEnv({
    //       API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAz1sU7SQbb-IUY6JlXr3xWDmrQobct5aM',
    //       API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAz1sU7SQbb-IUY6JlXr3xWDmrQobct5aM',
    //   });
    //
    //   console.log('Pre getposition');
    //   this.currentPos = await this.location.getPositionCoords();
    //
    //   const mapOptions: GoogleMapOptions = {
    //       camera: {
    //           target: {
    //               lat: this.currentPos.latitude,
    //               lng: this.currentPos.longitude
    //           },
    //           zoom: 18,
    //           tilt: 30
    //       }
    //   };
    //
    //   const mapCanvas = document.getElementById('map_canvas');
    //   mapCanvas.style.height = window.innerHeight * 9 / 10 + 'px';
    //   this.map = GoogleMaps.create(mapCanvas, mapOptions);
    //
    //   await this.map.one(GoogleMapsEvent.MAP_READY);
    //
    //   console.log('Map ready triggered');
    //   const marker: Marker = this.map.addMarkerSync({
    //       title: 'Initial location',
    //       icon: 'blue',
    //       animation: 'DROP',
    //       position: {
    //           lat: this.currentPos.latitude,
    //           lng: this.currentPos.longitude
    //       }
    //   });
    //   marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //   });
    // }

}

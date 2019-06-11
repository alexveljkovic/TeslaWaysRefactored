import { Component, OnInit } from '@angular/core';
import {Environment, GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, Marker} from '@ionic-native/google-maps/ngx';
import {AlertsService} from '../services/alert-service/alerts.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
    map: GoogleMap;
  constructor(
      private alertsService: AlertsService
  ) { }

  ngOnInit() {
      // TODO: Check connection
      this.loadMap();
  }

    loadMap() {
        // This code is necessary for browser
        Environment.setEnv({
            API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAfw3u7ZmqYhC6EXOsPLizVoYy00T9wn6M',
            API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAfw3u7ZmqYhC6EXOsPLizVoYy00T9wn6M',
        });

        const mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: 43.0741904,
                    lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create('map_canvas', mapOptions);

        const marker: Marker = this.map.addMarkerSync({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
                lat: 43.0741904,
                lng: -89.3809802
            }
        });
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {

        });
    }

}

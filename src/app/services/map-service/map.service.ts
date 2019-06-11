import { Injectable } from '@angular/core';
import {
  CameraPosition,
  Environment,
  GoogleMap,
  GoogleMapOptions,
  GoogleMaps,
  GoogleMapsEvent,
  ILatLng, LatLng,
  Marker
} from '@ionic-native/google-maps/ngx';
import {AlertsService} from '../alert-service/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: GoogleMap;
  constructor(private alertService: AlertsService) { }

  async loadMap() {
        // This code is necessary for browser
        /*
        Environment.setEnv({
            API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAfw3u7ZmqYhC6EXOsPLizVoYy00T9wn6M',
            API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAfw3u7ZmqYhC6EXOsPLizVoYy00T9wn6M',
        });*/

      Environment.setEnv({
          API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAz1sU7SQbb-IUY6JlXr3xWDmrQobct5aM',
          API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAz1sU7SQbb-IUY6JlXr3xWDmrQobct5aM',
      });

      console.log('Pre getposition');
      // this.currentPos = await this.location.getPositionCoords();

      const mapOptions: GoogleMapOptions = {
        camera: {
          target: {
              lat: 44.811222,
              lng: 20.369167
          },
          zoom: 18,
          tilt: 30
        }
      };

      const mapCanvas = document.getElementById('map_canvas');
      mapCanvas.style.height = window.innerHeight * 9 / 10 + 'px';
      this.map = GoogleMaps.create(mapCanvas, mapOptions);

      await this.map.one(GoogleMapsEvent.MAP_READY);

      console.log('Map ready triggered');
      const marker: Marker = this.map.addMarkerSync({
          title: 'Initial location',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 44.811222,
            lng: 20.369167
          }
      });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      });
    }
    async setTarget(position: LatLng) {
      // console.log(`[map-service] Setting target ${position.lat}, ${position.lng}`);
      const settings: CameraPosition<LatLng> = {target: position};
      try {
        await this.map.animateCamera(settings);
      } catch (e) {
        console.log(e);
        await this.alertService.displayError('Error with animate', 'Error while pointing location');
      }
    }
}

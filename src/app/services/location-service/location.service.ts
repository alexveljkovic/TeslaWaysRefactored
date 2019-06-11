import { Injectable } from '@angular/core';
import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';
import {AlertsService} from '../alert-service/alerts.service';
import {CameraPosition, GoogleMap, LatLng} from '@ionic-native/google-maps/ngx';
import {ILatLng} from '@ionic-native/google-maps/ngx';
import {MapService} from '../map-service/map.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  data: Geoposition;
  // map: GoogleMap;
  constructor(private geolocation: Geolocation,
              private alertService: AlertsService,
              private mapService: MapService) { }

  async getPositionCoords() {
    try {
      this.data = await this.geolocation.getCurrentPosition({enableHighAccuracy: true});
      console.log(`[location-service] lat: ${this.data.coords.latitude} lon: ${this.data.coords.longitude}`);
      return this.data.coords;
    } catch (e) {
      console.log(e);
      await this.alertService.displayError('Error with geolocation', 'Error getting location');
    }
  }

  async pointLocation() {
    try {
    // TODO: timeout not working?
      const watcher = this.geolocation.watchPosition({enableHighAccuracy: true, timeout: 100000, maximumAge: 5000});
      watcher.subscribe((data: any) => {
        const latlng: LatLng = new LatLng(data.coords.latitude, data.coords.longitude);
        this.mapService.setTarget(latlng);
      });
    } catch (e) {
      console.log(e);
      await this.alertService.displayError('Error with map', 'Error while watching position');
    }


  }
}


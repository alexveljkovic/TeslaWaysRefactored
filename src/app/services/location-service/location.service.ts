import { Injectable } from '@angular/core';
import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';
import {AlertsService} from '../alert-service/alerts.service';
import {LatLng} from '@ionic-native/google-maps/ngx';
import {MapService} from '../map-service/map.service';
import {Subscription} from 'rxjs';

const DEVELOPMENT = true;

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    data: Geoposition;
    subscription: Subscription;

    constructor(private geolocation: Geolocation,
                private alertService: AlertsService,
                private mapService: MapService) {
        this.init();
    }

    async init() {
        try {
            const watcher = this.geolocation.watchPosition({enableHighAccuracy: true, timeout: 100000, maximumAge: 5000});
            this.subscription = watcher.subscribe((data: any) => {
                const latlng: LatLng = new LatLng(data.coords.latitude, data.coords.longitude);
                console.log(latlng);
            });
        } catch (e) {
            console.log(e);
            await this.alertService.displayError('Problem with Geolocation', 'Unable to start location service');
        }
    }

    async unsubscribeWatcher() {
        try {
            this.subscription.unsubscribe();
        } catch (e) {
            await this.alertService.displayError('Error while unsubscribing', 'Cannot unsubscribe position watcher');
        }
    }

    async getPositionCoords() {
        if (!DEVELOPMENT) {
            try {
                this.data = await this.geolocation.getCurrentPosition({enableHighAccuracy: true});
                console.log(`[location-service] lat: ${this.data.coords.latitude} lon: ${this.data.coords.longitude}`);
                return this.data.coords;
            } catch (e) {
                console.log(e);
                await this.alertService.displayError('Error with geolocation', 'Error getting location');
            }
        } else {
            return { latitude: 44.8224036, longitude: 20.4511382 };
        }
    }
}


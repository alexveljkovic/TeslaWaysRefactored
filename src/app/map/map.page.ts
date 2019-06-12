import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class MapPage implements OnInit, OnDestroy {
    map: GoogleMap;
    currentPos: Coordinates;
    constructor(
        private alertsService: AlertsService,
        private platform: Platform,
        private mapService: MapService,
        private location: LocationService,
    ) {
    }

    async ngOnInit() {
        // TODO: Check connection
        await this.platform.ready();
        await this.mapService.loadMap();
        await this.location.pointLocation();
    }

    async ngOnDestroy() {
        await this.location.unsubscribeWatcher();
    }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {GoogleMap} from '@ionic-native/google-maps/ngx';
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
    constructor(
        private alertsService: AlertsService,
        private platform: Platform,
        private mapService: MapService,
        private location: LocationService
    ) {
    }

    async ngOnInit() {
        // TODO: Check connection
        await this.platform.ready();
        await this.mapService.loadMap();
        // TODO: Call geofenceService to set geofence (this.gameService.getPoints())
        await this.mapService.setPointsMarkers();
        await this.location.pointLocation();
    }

    async ngOnDestroy() {
        await this.location.unsubscribeWatcher();
        this.mapService.unsubscribeWatchers();
    }
}

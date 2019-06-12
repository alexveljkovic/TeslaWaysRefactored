import {Component, OnDestroy, OnInit} from '@angular/core';
import {Environment, GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, Marker} from '@ionic-native/google-maps/ngx';
import {AlertsService} from '../services/alert-service/alerts.service';
import {Platform} from '@ionic/angular';
import {LocationService} from '../services/location-service/location.service';
import {MapService} from '../services/map-service/map.service';
import {GameService} from '../services/game-service/game.service';

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
        private gameService: GameService
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

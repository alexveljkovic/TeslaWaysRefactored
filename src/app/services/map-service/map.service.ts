import {Injectable} from '@angular/core';
import {
    CameraPosition,
    Environment,
    GoogleMap,
    GoogleMapOptions,
    GoogleMaps,
    GoogleMapsEvent,
    LatLng,
    Marker
} from '@ionic-native/google-maps/ngx';
import {AlertsService} from '../alert-service/alerts.service';
import {GameService} from '../game-service/game.service';
import {GeofenceService} from '../geofence-service/geofence.service';
import {ConfigService} from '../config-service/config.service';
import {Events} from '@ionic/angular';
import {ɵHttpInterceptingHandler} from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class MapService {
    map: GoogleMap;
    mapDrag = false;
    subscriptions = [];
    markers: any = [];
    activeMarker: any = null;
    config: any = {};
    constructor(private alertService: AlertsService,
                private gameService: GameService,
                private geofenceService: GeofenceService,
                private configService: ConfigService,
                private events: Events
                ) {
        this.config = this.configService.getParams();

        this.events.subscribe('config-update', (update) => {
            this.config = update;
        });
    }

    async loadMap(center) {
        // This code is necessary for browser
        /*
        Environment.setEnv({
            API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAfw3u7ZmqYhC6EXOsPLizVoYy00T9wn6M',
            API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAfw3u7ZmqYhC6EXOsPLizVoYy00T9wn6M',
        });*/

        // Environment.setEnv({
        //     API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAz1sU7SQbb-IUY6JlXr3xWDmrQobct5aM',
        //     API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAz1sU7SQbb-IUY6JlXr3xWDmrQobct5aM',
        //     API_KEY_FOR_ANDROID: 'AIzaSyAfw3u7ZmqYhC6EXOsPLizVoYy00T9wn6M',
        // });
        const mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: center.lat,
                    lng: center.lon,
                },
                zoom: center.zoom,
                tilt: 30,
            },
            controls: {
                compass: true,
                myLocationButton: true,
                myLocation: true,   // (blue dot)
                indoorPicker: true,
                zoom: true,          // android only
                mapToolbar: true     // android only
            },
            gestures: {
                scroll: true,
                tilt: true,
                zoom: true,
                rotate: true
            }
        };

        if (this.map == null) {
            console.log('Map null. Should create.');
            const mapCanvas = document.getElementById('map_canvas');
            this.map = GoogleMaps.create(mapCanvas, mapOptions);
            console.log('Map created.');
            await this.map.one(GoogleMapsEvent.MAP_READY);
            console.log('Map ready triggered');
        }

        this.subscriptions.push(this.map.on(GoogleMapsEvent.MAP_DRAG_START).subscribe(() => {
            this.mapDrag = true;
        }));
        this.subscriptions.push(this.map.on(GoogleMapsEvent.MAP_DRAG_END).subscribe(() => {
            this.mapDrag = false;
        }));

        await this.geofenceService.setGeofence(this.gameService.getPoints()[0]);
    }

    async setTarget(position: any, showInfo = true) {
        console.log(`[map-service] Setting target ${position.lat}, ${position.lng}`);
        if (!this.mapDrag) {
            const settings: CameraPosition<LatLng> = {target: position, duration: 1000};
            try {
                await this.map.animateCamera(settings);
            } catch (e) {
                console.log(e);
                await this.alertService.displayError('Error with animate', 'Error while pointing location');
            }

            for (const markerObj of this.markers) {
                if (markerObj.lat === position.lat && markerObj.lon === position.lng) {
                    if (this.activeMarker) {
                        this.activeMarker.hideInfoWindow();
                    }
                    this.activeMarker = markerObj.marker;
                    markerObj.marker.showInfoWindow();
                }
            }
        }
    }

    async setPointsMarkers(routeId) {
        const points = this.gameService.getPoints({}, routeId);
        console.log(points);
        points.forEach(point => {
            this.setMarker(point);
        });
    }
    setMarker(point) {
        if (point.hidden !== 'true') {
            const marker: Marker = this.map.addMarkerSync({
                title: point.name[this.config.language],
                // TODO: custom icon
                icon: 'red',
                animation: 'DROP',
                position: {
                    lat: point.lat,
                    lng: point.lon
                }
            });
            this.markers.push({
                lat: point.lat,
                lon: point.lon,
                marker
            });
        }
    }
    async unsubscribeWatchers() {
        this.subscriptions.forEach(subs => {
            subs.unsubscribe();
        });
        await this.map.remove();
        this.map = null;
    }
}

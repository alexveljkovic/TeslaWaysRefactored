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

@Injectable({
    providedIn: 'root'
})
export class MapService {
    map: GoogleMap;
    mapDrag = false;
    subscriptions = [];
    constructor(private alertService: AlertsService,
                private gameService: GameService) {
    }

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
        const mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: 44.811222,
                    lng: 20.369167
                },
                zoom: 18,
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

        const mapCanvas = document.getElementById('map_canvas');
        mapCanvas.style.height = window.innerHeight * 9 / 10 + 'px';
        this.map = GoogleMaps.create(mapCanvas, mapOptions);

        await this.map.one(GoogleMapsEvent.MAP_READY);

        this.subscriptions.push(this.map.on(GoogleMapsEvent.MAP_DRAG_START).subscribe(() => {
            this.mapDrag = true;
        }));

        this.subscriptions.push(this.map.on(GoogleMapsEvent.MAP_DRAG_END).subscribe(() => {
            this.mapDrag = false;
        }));
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
        if (!this.mapDrag) {
            const settings: CameraPosition<LatLng> = {target: position};
            try {
                await this.map.animateCamera(settings);
            } catch (e) {
                console.log(e);
                await this.alertService.displayError('Error with animate', 'Error while pointing location');
            }
        }
    }

    async setPointsMarkers() {
        const points = this.gameService.getPoints();
        points.forEach(point => {
            this.setMarker(point);
        });
    }
    setMarker(point) {
        const marker: Marker = this.map.addMarkerSync({
            title: point.adress,
            // TODO: custom icon
            icon: 'red',
            animation: 'DROP',
            position: {
                lat: point.lat,
                lng: point.lon
            }
        });
    }
    unsubscribeWatchers() {
        this.subscriptions.forEach(subs => {
            subs.unsubscribe();
        });
    }
}

import {Injectable, OnInit} from '@angular/core';
import {AlertsService} from '../alert-service/alerts.service';
import {Geofence} from '@ionic-native/geofence/ngx';
import {Subscription} from 'rxjs';
import {UtilitiesService} from '../utilities-service/utilities.service';

@Injectable({
    providedIn: 'root'
})
export class GeofenceService  {
    transitionWatcher: Subscription;
    constructor(private alertService: AlertsService,
                private geofence: Geofence,
                private utilitiesService: UtilitiesService) {
        // this.geofence.initialize().then(
        //     () => {
        //             this.transitionWatcher = this.subscribeWatcher();
        //         },
        //     (err) => {
        //         this.alertService.displayError('Error while initalizing geofence', 'Unable to initialize');
        //     });
    }
    subscribeWatcher() {
        return this.geofence.onTransitionReceived().subscribe((data) => {
            if (data[0].transitionType === 1) {
                console.log('Entered geofence.');
                console.log(data[0]);
            } else if (data[0].transitionType === 2) {
                console.log('Left geofence.');
                console.log(data[0]);
            }
        });
    }

    async unsubscribeWatcher() {
        try {
            this.transitionWatcher.unsubscribe();
        } catch (e) {
            console.log(e);
            await this.alertService.displayError('Error while unsubscribing', 'Cannot unsubscribe watcher');
        }
    }
    async removeGeofence(pointId) {
        try {
            await this.geofence.remove(pointId);
            console.log('Removed geofence on location');
            console.log(pointId);
        } catch (e) {
            console.log(e);
            await this.alertService.displayError('Error while removing geofence', 'Cannot remove geofence');
        }
    }

    async setGeofence(point) {
        // const fence = {
        //     id: point.id, // any unique ID
        //     latitude:       this.utilitiesService.toFloat(point.lat), // 44.811222,
        //     longitude:      this.utilitiesService.toFloat(point.lon), // 20.369167,
        //     radius:         this.utilitiesService.toInt(point.radius), // 50,
        //     transitionType: 3, // enter and leave
        //     notification: { // notification settings
        //         id:             this.utilitiesService.toInt(point.id), // any unique ID
        //         title:          'Aktivirana lokacija!', // notification title
        //         text:           `Dosli ste do lokacije ${point.name}`, // notification body
        //         openAppOnClick: true // open app when notification is tapped
        //     }
        // };
        // try {
        //     await this.geofence.addOrUpdate(fence);
        //     console.log('[geofence-service]');
        //     console.log(`${fence.latitude} ${fence.longitude} ${fence.radius}`);
        // } catch (e) {
        //     console.log(e);
        //     await this.alertService.displayError('Error while setting geofence', 'Unable to set geofence');
        // }
    }
}

import {Injectable} from '@angular/core';
import {Network} from '@ionic-native/network/ngx';
import {AlertsService} from '../alert-service/alerts.service';
import {Platform} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {
    disconnectSub: any;
    connectSub: any;
    connected;
    constructor(private network: Network,
                private alertService: AlertsService,
                private platform: Platform) {

    }

    subscribe() {
        this.connected = navigator.onLine;
        this.disconnectSub = this.network.onDisconnect().subscribe(() => {
            this.connected = true;
            alert('Konekcija nije aktivna!\nObilasci ruta nece biti moguci.');
            this.alertService.displayError('Network connection', 'Network disconnected!');
        });

        this.connectSub = this.network.onConnect().subscribe(() => {
            this.connected = true;
            this.alertService.displayError('Network connection', `Network connected ${this.network.type}`);
        });
    }
    isOnline() {
        return this.connected;
    }
}

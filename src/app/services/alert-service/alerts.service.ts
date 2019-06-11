import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(public alertCtrl: AlertController) {
  }

   async displayError(title, message) {
      const alert = await this.alertCtrl.create({
          header: 'Error',
          subHeader: title,
          message,
          buttons: ['OK'],
      });

      alert.present();
  }
}

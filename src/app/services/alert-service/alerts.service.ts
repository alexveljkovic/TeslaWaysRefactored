import { Injectable } from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
      public alertCtrl: AlertController,
      public toastController: ToastController) {
  }

   async displayNotification(message) {
      const alert = await this.toastController.create({
          message,
          duration: 2000,
          color: 'warning',
          position: 'bottom',
      });

      alert.present();
  }

    async displayError(header, message) {
        const alert = await this.toastController.create({
            header,
            message,
            duration: 2000,
            color: 'dark'
        });

        alert.present();
    }
}

import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loadingElement: any = {};

  constructor(public loadingController: LoadingController) { }

    async showLoader() {
        this.loadingElement = await this.loadingController.create({
            message: 'Loading...',
        });
        await this.loadingElement.present();
    }

    async hideLoader() {
        await this.loadingElement.dismiss();
    }
}

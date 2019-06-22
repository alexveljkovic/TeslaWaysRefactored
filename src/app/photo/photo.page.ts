import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../services/config-service/config.service';
import {Events} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {
    image: any = null;
    config: any = {};
  constructor(
      private configService: ConfigService,
      private events: Events,
      private camera: Camera,
      private file: File,
      private sanitizer: DomSanitizer,
  ) {
      this.config = this.configService.getParams();

      this.events.subscribe('config-update', (update) => {
          this.config = update;
      });
  }

  ngOnInit() {
      const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE
      };

      this.camera.getPicture(options).then((imageData) => {
          this.image = window['Ionic']['WebView'].convertFileSrc(imageData);
      }, (err) => {
          // Handle error
      });
  }

  changeLanguage() {
      if (this.config.language === 'en') {
          this.configService.setParam('language', 'sr');
      } else {
          this.configService.setParam('language', 'en');
      }
  }

}

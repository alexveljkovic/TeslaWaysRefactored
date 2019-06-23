import { Injectable } from '@angular/core';
import {ApiService} from '../api-service/api.service';
import {ConfigService} from '../config-service/config.service';
import {AlertsService} from '../alert-service/alerts.service';

@Injectable({
  providedIn: 'root'
})

// Point structure
/*
{address: "Trg Republike 1a", category: "attraction", city: "Belgrade", country: "RS", description: {…}, …}
address: "Trg Republike 1a"
category: "attraction"
city: "Belgrade"
country: "RS"
description:
en: "<p></p>"
sr: "<p>Narodni muzej osnovan je ukazom ministra prosvete Jovana Sterije Popovića, 10. maja 1844. godine, kao Prilikom svoje jednodnevne posete Beogradu, Nikola Tesla nije propustio da pogleda postavku Narodnog muzeja. Muzeum serbski, koji je na jednom mestu trebalo da sabere starine i da ih za potomstvo sačuva. Organizovan u prvim decenijama svog rada i kao ustanova zaštite i kao naučna, istraživačka ustanova, koja je konstituisala nacionalni identitet i bila presudan akter u razvoju zaštite baštine, Narodni muzej je ubrzo prerastao u zvaničnog reprezenta države i društva, svedočeći i o mogućoj snazi kulture i muzeja u Srbiji. </p>"
__proto__: Object
hidden: "false"
id: "1"
imageUrl: "http://www.teslaways.rs/images/destinacije/gallery_images/1/71dacb59140abe38997801f1f48a50a1.jpg"
lat: "44.8163846"
lon: "20.45929"
name: {en: "National Museum", sr: "Narodni muzej"}
questions: Array(1)
0:
en:
correctAnswer: ""
possibleAnswers: ""
questionText: ""
__proto__: Object
sr:
correctAnswer: "Jovana Sterije Popovića"
possibleAnswers: Array(3)
0: "Jovana Sterije Popovića"
1: "Nikole Tesle"
2: "Vuka Karadžića"
length: 3
__proto__: Array(0)
questionText: "Narodni muzej osnovan je ukazom:"
__proto__: Object
__proto__: Object
length: 1
__proto__: Array(0)
radius: "50"
type: "museum"

 */

export class PointService {
  public res: any = {};
  TH_DEV = false;
  constructor(
      private apiService: ApiService,
      private configService: ConfigService,
      private alertsService: AlertsService,
  ) { }

    async getPoints(limit = 0, country = 'SR') {
      try {
          this.res = await this.apiService.GetData(`points/`);

          if (limit !== 0) {
              return this.res.slice(0, limit);
          } else {
              if (this.TH_DEV) {
                  this.res.map(el => {
                      el.hidden = 'true';
                      return el;
                  });
                  console.log(this.res);
              }
              return this.res;
          }

      } catch (err) {
          console.log(err);
          await this.alertsService.displayError('Locations fetching error', 'Unable to fetch locations');
      }
    }
}

import { Component } from '@angular/core';
import {NavController, Events} from '@ionic/angular';
import {ApiService} from '../services/api-service/api.service';
import {AlertsService} from '../services/alert-service/alerts.service';
import {NewsService} from '../services/news-service/news.service';
import {GameService} from '../services/game-service/game.service';
import {ConfigService} from '../services/config-service/config.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    private subscription: any = null;
    private config: any = {};

    constructor(
        private navCtrl: NavController,
        private alertsService: AlertsService,
        private apiService: ApiService,
        private newsService: NewsService,
        private gameService: GameService,
        private configService: ConfigService,
        private events: Events,
    ) {
        this.config = this.configService.getParams();

        this.events.subscribe('config-update', (update) => {
            this.config = update;
        });
    }

    async gotoMap(routeId) {
        this.gameService.setActiveRoute(routeId);
        if (!navigator.onLine) {
            this.alertsService.displayError('No connection', 'You need internet connection to load the map.');
        } else {
            this.navCtrl.navigateForward('map');
        }
    }

    async gotoNews(newsId) {
        this.gameService.setActiveNews(newsId, 'news');
        this.navCtrl.navigateForward('news');
    }

    async gotoFeatured(newsId) {
        this.gameService.setActiveNews(newsId, 'featured');
        this.navCtrl.navigateForward('news');
    }

    async gotoPhoto() {
        this.navCtrl.navigateForward('photo');
    }

    changeLanguage() {
        if (this.config.language === 'en') {
            this.configService.setParam('language', 'sr');
        } else {
            this.configService.setParam('language', 'en');
        }
    }

    // ionViewDidEnter() {
    //     // if (!DEVELOPMENT) {
    //     //     this.subscription = this.platform.backButton.subscribe(() => {
    //     //         navigator['app'].exitApp();
    //     //     });
    //     // }
    // }
    //
    // ionViewWillLeave(){
    //     this.subscription.unsubscribe();
    // }

}

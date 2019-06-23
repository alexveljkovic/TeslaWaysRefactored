import {Component, OnDestroy, OnInit} from '@angular/core';
import {GoogleMap} from '@ionic-native/google-maps/ngx';
import {AlertsService} from '../services/alert-service/alerts.service';
import {Events, ModalController, NavController, Platform} from '@ionic/angular';
import {LocationService} from '../services/location-service/location.service';
import {MapService} from '../services/map-service/map.service';
import {GameService} from '../services/game-service/game.service';
import {ConfigService} from '../services/config-service/config.service';
import {UtilitiesService} from '../services/utilities-service/utilities.service';
import {QuestionComponent} from '../components/question/question.component';

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})

export class MapPage {
    map: GoogleMap;
    route: any = {};
    currentLocation: any = {};
    mapTimer: any = null;
    config: any = {};
    rippleAnimation: any = null;
    watchFence: any = null;
    discoveredPoint: any = null;
    private closestPoints: any = [];

    constructor(
        private alertsService: AlertsService,
        private platform: Platform,
        private mapService: MapService,
        private locationService: LocationService,
        private gameService: GameService,
        private configService: ConfigService,
        private events: Events,
        private navController: NavController,
        private utilities: UtilitiesService,
        private modalController: ModalController,
    ) {
        this.config = this.configService.getParams();

        this.events.subscribe('config-update', (update) => {
            this.config = update;
        });

        this.init();
    }

    fenceWatcher() {
        if (this.watchFence == null) {
            this.watchFunction();
            this.watchFence = setInterval(() => {
                this.watchFunction();
            }, 5000);
        }
    }

    watchFunction() {
        // console.log(this.closestPoints[0]);
        // console.log(this.closestPoints[0].rawDist, this.closestPoints[0].radius);
        if (this.closestPoints.length > 0 && this.closestPoints[0].rawDist < this.utilities.toFloat(this.closestPoints[0].radius)) {
            this.animateRipple();
            document.getElementById('dist-meter').style.color = 'forestgreen';
            this.discoveredPoint = this.closestPoints[0];
        } else {
            clearInterval(this.rippleAnimation);
            document.getElementById('dist-meter').style.color = 'black';
            this.discoveredPoint = null;
            this.rippleAnimation = null;
        }
    }

    animateRipple() {
        if (this.rippleAnimation == null) {
            let i = 1;
            this.rippleAnimation = setInterval(
                () => {
                    if (i > 0) {
                        document.getElementById('ripple').style.opacity = '0.2';
                        document.getElementById('ripple').classList.remove('active');
                    } else {
                        document.getElementById('ripple').classList.add('active');
                    }
                    i = -i;
                },
                1000
            );
        }
    }

    async pointToLocation(lat, lng) {
        this.mapService.setTarget({
            lat,
            lng
        });
    }

    async clearIntervals() {
        clearInterval(this.watchFence);
        clearInterval(this.mapTimer);
        clearInterval(this.rippleAnimation);
        this.watchFence = null;
        this.rippleAnimation = null;
        document.getElementById('dist-meter').style.color = 'black';
        document.getElementById('ripple').classList.remove('active');
    }

    async getListPoints(routeId) {
        this.currentLocation = await this.locationService.getPositionCoords();
        this.closestPoints = this.gameService.getClosestPoints(
            this.currentLocation.latitude,
            this.currentLocation.longitude,
            routeId
        ).map(el => {
            if (this.gameService.unlockedPoints.includes(el.id)) {
                el.discovered = false;
            } else {
                el.discovered = true;
            }
            return el;
        });
    }

    async init() {
        await this.platform.ready();
        console.log('INIT');
        this.route = this.gameService.getActiveRoute();
        await this.getListPoints(this.route.id);
        this.fenceWatcher();
        // TODO: Check connection
        await this.mapService.loadMap(this.route.center);
        await this.mapService.setPointsMarkers(this.route.id);
        this.mapTimer = setInterval(() => {
            this.getListPoints(this.route.id);
        }, 2000);
    }

    async ionViewWillEnter() {
        console.log('Will enter');
        this.init();
    }

    async ionViewWillLeave() {
        console.log('Will leave');
        await this.locationService.unsubscribeWatcher();
        this.mapService.unsubscribeWatchers();
        await this.clearIntervals();
    }

    async gotoLocation(pointId) {
        const point = this.gameService.getPointData(pointId);

        if (this.discoveredPoint == null || pointId !== this.discoveredPoint.id) {
            this.alertsService.displayNotification('You need to get closer to unlock this location.');
        } else {
            if (this.gameService.unlockedPoints.includes(point.id) || this.gameService.activeQuestion == null) {
                await this.gameService.addUnlockedPoint(pointId);
                this.gameService.setActivePoint(point);
                this.gameService.setActiveQuestion(this.utilities.choice(point.questions));
                this.navController.navigateForward('location');
            } else {
                this.clearIntervals();
                console.log('Active question correct: ' + this.gameService.activeQuestion.sr.correctAnswer);
                const modal = await this.modalController.create({
                    component: QuestionComponent,
                    componentProps: {
                        question: this.gameService.getActiveQuestion(),
                    }
                });
                await modal.present();
                const {data} = await modal.onDidDismiss();
                if (data && data.correct) {
                    await this.gameService.addUnlockedPoint(pointId);
                    this.gameService.setActivePoint(point);
                    this.gameService.setActiveQuestion(this.utilities.choice(point.questions));
                    this.navController.navigateForward('location');
                }
            }
        }
    }

    changeLanguage() {
        if (this.config.language === 'en') {
            this.configService.setParam('language', 'sr');
        } else {
            this.configService.setParam('language', 'en');
        }
    }
}

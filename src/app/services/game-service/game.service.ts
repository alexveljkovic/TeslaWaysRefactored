import {Injectable} from '@angular/core';
import {NewsService} from '../news-service/news.service';
import {StorageService} from '../storage-service/storage.service';
import {PointService} from '../point-service/point.service';
import {AlertsService} from '../alert-service/alerts.service';
import {UtilitiesService} from '../utilities-service/utilities.service';
import {RouteService} from '../route-service/route.service';
import {LoaderService} from '../loader-service/loader.service';


/*
1. Prazno sve
2. Dodje do prve lokacije -> ActiveLocation = location
3. ActiveQuestion nema
4. Prihvati lokaciju?
	DA
	- Prikaze lokaciju
	- ActiveQuestion = location.question
	- Ima dugme: Odgovori odmah na pitanje za drugu lokaciju

	NE
	nista
5. Izadje van lokacije -> ActiveLocation = null, ActiveQuestion se ne menjaiz


6. Dodje do druge lokacije -> ActiveLocation = location
7. Prihvati lokaciju?
	DA
	8.0.1 Imas pitanje, prvo odgovori
	8.0.2 Tacan odgovor ->
		- Prikaze lokaciju
		- ActiveQuestion = location.question
		- Ima dugme: Odgovori odmah na pitanje za drugu lokaciju
			Odgovori -> ActiveQuestion = null
 */
//
// class Question {
//     public questionText: string;
//     public possibleAnswers: any = [];
//     public correctAnswer: string;
//
//     constructor(questionText, possibleAnswers, correctAnswer) {
//         this.questionText = questionText;
//         this.possibleAnswers = possibleAnswers;
//         this.correctAnswer = correctAnswer;
//     }
// }

@Injectable({
    providedIn: 'root'
})
export class GameService {
    public news: any = {};
    public featured: any = {};
    public points: any = [];
    public routes: any = [];
    public activePoint: any = {};
    public activeQuestion: any = null;
    public activeRoute: any = null;
    public unlockedPoints: any = [];
    public profile: any = {};

    constructor(
        private newsService: NewsService,
        private storageService: StorageService,
        private pointService: PointService,
        private alertsService: AlertsService,
        private utilityService: UtilitiesService,
        private routeService: RouteService,
        private loaderService: LoaderService,
    ) {
        this.init();
        // TODO: Initialize profile
    }

    async init() {
        await this.loaderService.showLoader();
        this.unlockedPoints = await this.storageService.getValue('unlocked') || [];
        console.log(this.unlockedPoints);
        await this.loadNews();
        await this.loadPoints();
        await this.loadRoutes();
        await this.loadFeatured();
        await this.loaderService.hideLoader();
    }

    async loadNews() {
        this.news = await this.newsService.getNews();
    }

    async loadFeatured() {
        // TODO: Check connection
        this.featured = await this.newsService.getFeaturedNews();
    }

    async loadPoints() {
        // TODO: Check connection
        this.points = await this.pointService.getPoints();
    }

    async loadRoutes() {
        this.routes = await this.routeService.getRoutes();
    }

    getClosestPoints(lat, lon, routeId = null, radius = null, limit = null) {
        const sorted = this.sortPoints(lat, lon, radius);
        const filtered = sorted.filter(el => {
            if (routeId == null) {
                return true;
            }
            //this.getRoute(routeId).routePoints.includes(el.id);
            console.log(this.getRoute(routeId));
            console.log(el.id);
            return true;
        });

        if (limit) {
            return filtered.slice(0, limit);
        } else {
            return filtered;
        }
    }

    getPoints(filters = {}, routeId = null) {
        return this.points.filter(el => {
            for (const key of Object.keys(filters)) {
                if (el[key] !== filters[key]) {
                    return false;
                }

                if (routeId) {
                    const route = this.getRoute(routeId);
                    if (!route.includes(el.id)) {
                        return false;
                    }
                }
            }
            return true;
        });
    }

    getRoute(routeId) {
        const route = this.routes.find(el => el.id === routeId);
        if (route == null) {
            this.alertsService.displayError('Route not found', 'Unable to find route data')
            throw Error(`Route with id ${routeId} not found.`);
        }
        return route;
    }

    sortPoints(lat, lon, radius) {
        this.points.sort((a, b) => {
            const d1 = this.utilityService.euclideanDistance(a.lat, a.lon, lat, lon);
            a.rawDist = d1;
            a.dist = d1 < 1000 ?
                `${Math.round(d1)} m` : `${Math.round(d1 / 10) / 100} Km`;
            const d2 = this.utilityService.euclideanDistance(b.lat, b.lon, lat, lon);
            b.rawDist = d2;
            b.dist = d2 < 1000 ?
                `${Math.round(d2)} m` : `${Math.round(d2 / 10) / 100} Km`;
            return d1 - d2;
        });
        console.log(this.points);
        return this.points.filter(el => radius == null || this.utilityService.euclideanDistance(el.lat, el.lon, lat, lon) <= radius);
    }

    getNews(filters = {}) {
        return this.news.filter(el => {
            for (const key of Object.keys(filters)) {
                if (el[key] !== filters[key]) {
                    return false;
                }
            }
            return true;
        });
    }

    getFeatured(filters = {}) {
        return this.featured.filter(el => {
            for (const key of Object.keys(filters)) {
                if (el[key] !== filters[key]) {
                    return false;
                }
            }
            return true;
        });
    }

    setActiveQuestion(question) {
        this.activeQuestion = question;
    }

    setActivePoint(point) {
        this.activePoint = point;
    }

    getActivePoint() {
        return this.activePoint;
    }

    getRoutes() {
        return this.routes;
    }

    getPointData(pointId) {
        const foundPoint = this.points.find((el) => el.id === pointId);
        if (foundPoint == null) {
            throw Error('Point not found!');
        }
        console.log(foundPoint);
        return foundPoint;
    }

    addUnlockedPoint(pointId) {
        this.unlockedPoints.push(pointId);
    }

    // answerQuestion(answer) {
    //     const question = this.getActiveQuestion();
    //     if (question != null) {
    //         if (question.correctAnswer === answer) {
    //             this.activePoint.locked = false;
    //             this.activeQuestion = this.activePoint.pointQuestions;
    //         }
    //     } else {
    //         this.alertsService.displayError('Invalid question', 'No active questions!');
    //     }
    // }

    getActiveQuestion() {
        return this.activeQuestion;
    }

    setActiveRoute(routeId) {
        this.activeRoute = this.routes.find(el => el.id === routeId);
    }

    getActiveRoute() {
        return this.activeRoute;
    }
}

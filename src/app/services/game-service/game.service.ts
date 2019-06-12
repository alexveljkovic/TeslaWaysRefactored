import {Injectable} from '@angular/core';
import {NewsService} from '../news-service/news.service';
import {StorageService} from '../storage-service/storage.service';
import {PointService} from '../point-service/point.service';
import {AlertsService} from '../alert-service/alerts.service';
import {UtilitiesService} from '../utilities-service/utilities.service';


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

class Question {
    public questionText: string;
    public possibleAnswers: any = [];
    public correctAnswer: string;

    constructor(questionText, possibleAnswers, correctAnswer) {
        this.questionText = questionText;
        this.possibleAnswers = possibleAnswers;
        this.correctAnswer = correctAnswer;
    }
}

@Injectable({
    providedIn: 'root'
})
export class GameService {
    public news: any = {};
    public points: any = {};
    public activePoint: any = {};
    public activeQuestion: any = null;

    constructor(
        private newsService: NewsService,
        private storageService: StorageService,
        private pointService: PointService,
        private alertsService: AlertsService,
        private utilityService: UtilitiesService,
    ) {
        this.loadNews();
        this.loadPoints();
        // this.loadTHPoints(); // Treasure Hunt
    }

    async loadNews() {
        // TODO: Check connection
        this.news = await this.newsService.getNews();
        await this.storageService.setValue('news', this.news);
    }

    async loadPoints() {
        // TODO: Check connection
        this.points = await this.pointService.getPoints();
        await this.storageService.setValue('points', this.pointService);
    }

    /*
        // Do not draw markers, but add fence on map for thPoints[0]
        async loadTHPoints() {
          // TODO: Enable more routes
            // TODO: Check connection
            this.thPoints = await this.pointService.getTHPoints();
            await this.storageService.setValue('thPoints', this.pointService);
        }

        async loadTHPoints() {
            // TODO: Check connection
            this.thPoints = await this.pointService.getTHPoints();
            await this.storageService.setValue('thPoints', this.pointService);
        }*/

    getClosestPoints(lat, lon, radius) {
        const sorted = this.utilityService.sortPoints(lat, lon, radius, this.points);
        return sorted; // TODO: Filter closest
    }

    getPoints() {
        return this.utilityService.toArray(this.points);
    }

    getPointData(pointId) {
        this.activePoint = this.points.find((el) => el.id === pointId);
        if (this.activePoint == null) {
            throw Error('Point not found!');
        }
        if (!this.activePoint.locked || this.activeQuestion == null) {
            return this.activePoint;
            this.activeQuestion = this.activePoint.question;
        } else {
            return {
                id: this.activePoint.id,
                title: this.activePoint.id,
                lat: this.activePoint.lat,
                lon: this.activePoint.lon,
                question: this.activeQuestion,
            };
        }
    }

    answerQuestion(answer) {
        const question = this.getCurrentQuestion();
        if (question != null) {
            if (question.correctAnswer === answer) {
                this.activePoint.locked = false;
                this.activeQuestion = this.activePoint.pointQuestions;
            }
        } else {
            this.alertsService.displayError('Invalid question', 'No active questions!');
        }
    }

    getCurrentQuestion() {
        return this.activeQuestion;
    }
}

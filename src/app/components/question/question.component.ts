import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {AlertsService} from '../../services/alert-service/alerts.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  question: any = {};
  constructor(
      private modalController: ModalController,
      private alertService: AlertsService,
      private navParams: NavParams,
  ) {
  }

  ngOnInit() {
      this.question = this.navParams.get('question');
  }

  answerQuestion(answer) {
      if (answer !== this.question.sr.correctAnswer) {
        this.alertService.displayNotification('Odgovor nije tačan, pokušajte ponovo.');
      } else {
        this.modalController.dismiss({ correct: true});
      }
  }

}

import { Component } from '@angular/core';
import { Quiz } from '../models/quiz';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
   quizData: Quiz = require('../../assets/data.json');
}

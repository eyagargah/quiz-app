import { Component } from '@angular/core';
import { QuizService } from 'app/quiz.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  score:any
constructor(private quizService : QuizService){}

ngOnInit(){
  this.score = this.quizService.getScore()
  console.log(this.score)
}
}

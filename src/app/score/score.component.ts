import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'app/quiz.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  score:any
constructor(private quizService : QuizService , private router:Router){}

ngOnInit(){
  this.score = this.quizService.getScore()
  console.log(this.score)
}

playAgain(){
this.router.navigate(['/'])
}
}

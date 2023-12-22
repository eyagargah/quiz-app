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
  title:any
  icon:any
constructor(private quizService : QuizService , private router:Router){}

ngOnInit(){
  this.score = this.quizService.getScore()
  this.title = this.quizService.getTitle()
  this.icon = this.quizService.getIcon()

}

playAgain(){
this.router.navigate(['/'])
}
}

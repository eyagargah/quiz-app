import { Component } from '@angular/core';
import { QuizService } from 'app/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {

  title : any;
  questions : any;
  icon : any;
constructor(private quizService : QuizService){}

ngOnInit(){
  this.title = this.quizService.getTitle()
  this.icon = this.quizService.getIcon()
  this.questions = this.quizService.getSubjectQuestions()
  console.log(this.title)
  console.log(this.icon)
  console.table(this.questions)
}
}

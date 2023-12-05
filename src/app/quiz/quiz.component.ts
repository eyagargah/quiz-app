import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  next = false ;
  i=0
  length : any
constructor(private quizService : QuizService , private router:Router){}

ngOnInit(){
  this.title = this.quizService.getTitle()
  this.icon = this.quizService.getIcon()
  this.questions = this.quizService.getSubjectQuestions()
  
  console.log(this.title)
  console.log(this.icon)
  console.table(this.questions)
}

submitAnswer(){
  if(this.i<this.questions.length){
    this.i++
  }else {
    this.router.navigate(['score']);
  }
}
}

import { Component } from '@angular/core';
import  quizzesData from '../../assets/quizes.json';
import { Router } from '@angular/router';
import { QuizService } from 'app/quiz.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
   questions:any;
   data = quizzesData.quizzes;

   constructor(private router:Router , private quizService : QuizService){}

   getQuizQuestions(e:any , i:any){
    
    this.quizService.setTitle(this.data[i].title)
    this.quizService.setIcon(this.data[i].icon)
    this.questions = this.data[i].questions;
    this.quizService.setSubjectQuestions(this.questions)
    this.router.navigate(['quiz']);
   }


   toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
}

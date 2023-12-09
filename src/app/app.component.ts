import { Component } from '@angular/core';
import  quizzesData from "../assets/quizes.json";
import { QuizService } from './quiz.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quiz-app';
  data = quizzesData.quizzes;
  constructor(private quizService : QuizService){}
  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
  ngOnInit(){
    this.quizService.setQuizzesData ()
  }
}

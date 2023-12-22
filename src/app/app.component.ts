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
  quizTitle:any
  icon:any
  data = quizzesData.quizzes;
  constructor(private quizService : QuizService){}
  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
  ngOnInit(){
    this.quizService.setQuizzesData ()
  }

  getTitleAndIcon(){
    this.icon = this.quizService.getIcon()
    this.quizTitle = this.quizService.getTitle()
  }
}

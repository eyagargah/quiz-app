import { Component } from '@angular/core';
import  quizzesData from "../assets/quizes.json";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quiz-app';
  data = quizzesData.quizzes;
  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
  ngOnInit(){
    localStorage.setItem('data' , JSON.stringify(this.data))
  }
}

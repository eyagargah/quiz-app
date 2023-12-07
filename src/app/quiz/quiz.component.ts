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
  selectedAnswer : any;
  score: any;
constructor(private quizService : QuizService , private router:Router){}

ngOnInit(){

  this.title = this.quizService.getTitle()
  this.icon = this.quizService.getIcon()
  this.questions = this.quizService.getSubjectQuestions()
  console.log(this.title)
  console.log(this.icon)
  console.table(this.questions)
  var buttons = document.querySelectorAll('.option');

  // Add click event listener to each button
  buttons.forEach(function(button) {
    button.addEventListener('click', function(e:any) {
      // Remove active class from all buttons
      buttons.forEach(function(btn) {
        btn.classList.remove('active');
        console.log(btn)
      });
      // Add active class to the clicked button
      const selectedBtn = e.target.parentNode
      selectedBtn.classList.add('active');
    });
  });
}

submitAnswer(){
  if(this.i<9){
    this.i++
  }else if(this.i==9){
    this.router.navigate(['score']);
  }
}

calculateScore(){
  
}
}

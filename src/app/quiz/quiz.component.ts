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
  var submitBtn = document.querySelector('.submit')
  submitBtn?.setAttribute('disabled','')
    // Add click event listener to each button
  buttons.forEach(function(button) {
    button.addEventListener('click', function(e:any) {
      submitBtn?.removeAttribute('disabled')
      // Remove active class from all buttons
      buttons.forEach(function(btn) {
        btn.classList.remove('active');
        console.log(btn)
      });
      // Add active class to the clicked button
      let selectedAnswer = e.target.parentNode
      selectedAnswer.classList.add('active');
    });
  });
}

submitAnswer(i:any){
  let answer = document.querySelector('.active')?.children[1].innerHTML
  let selectedAnswerBtn = document.querySelector('.active')
  if(answer == this.questions[i].answer ){
    selectedAnswerBtn?.classList.remove("active")
    selectedAnswerBtn?.classList.add('correct')
  }else {
    selectedAnswerBtn?.classList.remove("active")
    selectedAnswerBtn?.classList.add('wrong')

  }

}

calculateScore(){
  
}
}

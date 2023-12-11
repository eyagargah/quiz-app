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
  questionsData: any;
  questions : any;
  icon : any;
  next = false ;
  i=0
  length : any
  score= 0;
  constructor(private quizService : QuizService , private router:Router){}

ngOnInit(){
  
  this.questions = JSON.parse(localStorage.getItem('questions')!)
  console.log(this.questions)
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
  var options = document.querySelector('.options')

  let answer = document.querySelector('.active')?.children[1].innerHTML
  let submitBtn = document.querySelector('.submit')
  let correctAnswerIndex ;
  console.table(this.questions[i].options)

  //optimize this section
  for(let j=0 ; j<this.questions[i].options.length ; j++){
    if(this.questions[i].options[j]== this.questions[i].answer){
      correctAnswerIndex = j 
    }
  }
  console.log(correctAnswerIndex)

if(submitBtn){
  submitBtn.innerHTML = "Next Question"

}  let selectedAnswerBtn = document.querySelector('.active')
  if(answer == this.questions[i].answer ){
    selectedAnswerBtn?.classList.remove("active")
    selectedAnswerBtn?.classList.add('correct')
    this.score += 1
  }else {
    selectedAnswerBtn?.classList.remove("active")
    selectedAnswerBtn?.classList.add('wrong')
    if(options && correctAnswerIndex){
      options.children[correctAnswerIndex].classList.add("correct")
    }
  }
  
 i++
}

}

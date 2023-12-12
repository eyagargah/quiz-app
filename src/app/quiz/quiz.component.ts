import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  title: any;
  questionsData: any;
  questions: any;
  icon: any;
  next = true;
  i = 0;
  index: any;
  score = 0;
  constructor(private router: Router) {}

  ngOnInit() {
    let submitBtn = document.querySelector('.submitBtn')
    this.questionsData = JSON.parse(localStorage.getItem('questions')!);
    this.questions = this.questionsData[this.i]
    
    let options = document.querySelectorAll('.option')
    options.forEach(function(button){
      button.addEventListener('click', function (e: any) {
        submitBtn?.removeAttribute('disabled');
        options.forEach(function (btn) {
          btn.classList.remove('active');
        });

        
        
        let selectedAnswer = e.target.parentNode;
        selectedAnswer.classList.add('active');

    })
    })

    submitBtn?.addEventListener('click', ()=> {
      if(submitBtn){
        if(submitBtn?.innerHTML=="Submit Answer"){
          //check if the selected answer is wrong or right
          let selectedAnswer = document.querySelector('.active');
          let correctAnswerIndex;
          for (let j = 0; j < this.questions.options.length; j++) {
            if (this.questions.answer == this.questions.options[j]) {
              correctAnswerIndex = j;
            }
          }

          if (
            correctAnswerIndex &&
            selectedAnswer?.children[1].innerHTML ==
              this.questions.options[correctAnswerIndex!]
          ) {
            selectedAnswer?.classList.add('correct');
            this.score+=1
          } else {
            selectedAnswer?.classList.add('wrong');
            if (correctAnswerIndex) {
              document
                .querySelector('.options')
                ?.children[correctAnswerIndex].classList.add('correct');
            }
          }


          submitBtn.innerHTML = "Next Question"
        }else {
          if(this.i<9){
            submitBtn.innerHTML = "Submit Answer"
            this.i+=1;
            this.questions = this.questionsData[this.i]
            options.forEach(function (button) {
              options.forEach(function (btn) {
                btn.classList.remove('active');
                btn.classList.remove('correct');
                btn.classList.remove('wrong');
              });
            });
          }else if (this.i == 9){
            this.router.navigate(['score'])
          }
          else if(this.i==8){
          submitBtn.innerHTML = "Submit Quiz"

          }
        }
      }
      
    })
  }

  nextQuestion(index:any){
    if(this.i<9){
      this.i+=1;
      this.questions = this.questionsData[this.i]
      console.log(this.i)
    }else if (this.i == 9){
      this.router.navigate(['score'])
    }
   

  }
}

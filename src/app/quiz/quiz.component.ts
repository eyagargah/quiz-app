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

    })
    })
    submitBtn?.addEventListener('click', ()=> {
      if(submitBtn){
        if(submitBtn?.innerHTML=="Submit Answer"){
          submitBtn.innerHTML = "Next Question"
        }else {
          submitBtn.innerHTML = "Submit Answer"
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

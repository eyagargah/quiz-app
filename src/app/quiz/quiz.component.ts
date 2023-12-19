import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  
  selectedAnswer = document.querySelector('.active');
  title: any;
  questionsData: any;
  questions: any;
  icon: any;
  next = true;
  i = 0;
  index: any;
  score = 0;
  correctAnswerIndex: any;
  options:any
  submitBtn: any
  optionsContainer:any
  constructor(private router: Router) {}

  ngOnInit() {
    this.options = document.querySelectorAll('.option');
    this.submitBtn = document.querySelector('.submitBtn');
    this.questionsData = JSON.parse(localStorage.getItem('questions')!);
    this.questions = this.questionsData[this.i];

    this.options.forEach((button: any) => {
      button.addEventListener('click', (e: any) => {
        this.submitBtn?.removeAttribute('disabled');
        this.options.forEach(function (btn: any) {
          btn.classList.remove('active');
        });

        this.selectedAnswer = e.target.parentNode;
        this.selectedAnswer?.classList.add('active');
        
      });
    });

    this.submitBtn?.addEventListener('click', () => {
      this.correctAnswerIndex = this.getCorrectAnswerIndex()
      this.checkAnswer(this.correctAnswerIndex , this.selectedAnswer)
    });

  }

  nextQuestion(index: any) {
    if (this.i < 9) {
      this.i += 1;
      this.questions = this.questionsData[this.i];
    } else if (this.i == 9) {
      this.router.navigate(['score']);
    }
  }


  checkAnswer( correctAnswerIndex : any , selectedAnswer : any) {
   
  }


  increaseScore(score: any) {
    score += 1;
  }

  getCorrectAnswerIndex() {
    let correctIndex
    for (let j = 0; j < this.questions.options.length; j++) {
      if (this.questions.answer == this.questions.options[j]) {
        correctIndex = j;
      }
    }
    return correctIndex
  }

  restartQuiz() {
 
    this.options.forEach((button : any) => {
      this.options.forEach(function (btn: any) {
        btn.classList.remove('active');
        btn.classList.remove('correct');
        btn.classList.remove('wrong');
      });
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  options = document.querySelectorAll('.options');
  submitBtn = document.querySelector('.submitBtn');
  title: any;
  questionsData: any;
  questions: any;
  icon: any;
  next = true;
  i = 0;
  index: any;
  score = 0;
  correctAnswerIndex: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.questionsData = JSON.parse(localStorage.getItem('questions')!);
    this.questions = this.questionsData[this.i];

    let options = document.querySelectorAll('.option');
    options.forEach((button) => {
      button.addEventListener('click', (e: any) => {
        this.submitBtn?.removeAttribute('disabled');
        options.forEach(function (btn) {
          btn.classList.remove('active');
        });

        let selectedAnswer = e.target.parentNode;
        console.log(selectedAnswer);
        selectedAnswer.classList.add('active');
      });
    });

    this.submitBtn?.addEventListener('click', () => {
      if (this.submitBtn) {
        if (this.submitBtn?.innerHTML == 'Submit Answer') {
          //check if the selected answer is wrong or right
          let selectedAnswer = document.querySelector('.active');

          if (
            this.correctAnswerIndex &&
            selectedAnswer?.children[1].innerHTML ==
              this.questions.options[this.correctAnswerIndex!]
          ) {
            selectedAnswer?.classList.add('correct');
            this.score += 1;
          } else {
            selectedAnswer?.classList.add('wrong');
            if (this.correctAnswerIndex) {
              document
                .querySelector('.options')
                ?.children[this.correctAnswerIndex].classList.add('correct');
            }
          }

          this.submitBtn.innerHTML = 'Next Question';
        } else {
          if (this.i < 9) {
            this.submitBtn.innerHTML = 'Submit Answer';
            this.i += 1;
            this.questions = this.questionsData[this.i];
            options.forEach(function (button) {
              options.forEach(function (btn) {
                btn.classList.remove('active');
                btn.classList.remove('correct');
                btn.classList.remove('wrong');
              });
            });
          } else if (this.i == 9) {
            this.router.navigate(['score']);
          } else if (this.i == 8) {
            this.submitBtn.innerHTML = 'Submit Quiz';
          }
        }
      }
    });
  }

  nextQuestion(index: any) {
    if (this.i < 9) {
      this.i += 1;
      this.questions = this.questionsData[this.i];
      console.log(this.i);
    } else if (this.i == 9) {
      this.router.navigate(['score']);
    }
  }

  checkAnswer() {}
  increaseScore(score: any) {
    score += 1;
  }

  getCorrectAnswer() {
    for (let j = 0; j < this.questions.options.length; j++) {
      if (this.questions.answer == this.questions.options[j]) {
        this.correctAnswerIndex = j;
      }
    }
  }

  restartQuiz() {
    this.options.forEach((button) => {
      this.options.forEach(function (btn) {
        btn.classList.remove('active');
        btn.classList.remove('correct');
        btn.classList.remove('wrong');
      });
    });
  }
}

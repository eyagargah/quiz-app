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
    this.questionsData = JSON.parse(localStorage.getItem('questions')!);
    this.questions = this.questionsData[this.i];
    var buttons = document.querySelectorAll('.option');
    var submitBtn = document.querySelector('.submitBtn');
    buttons.forEach(function (button) {
      button.addEventListener('click', function (e: any) {
        submitBtn?.removeAttribute('disabled');
        buttons.forEach(function (btn) {
          btn.classList.remove('active');
        });
        let selectedAnswer = e.target.parentNode;
        selectedAnswer.classList.add('active');
      });
    });
  }

  submitAnswer() {
    let submitBtn = document.querySelector('.submitBtn')
    if (submitBtn) {
      submitBtn.innerHTML = 'Next Question';
    }
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
    } else {
      selectedAnswer?.classList.add('wrong');
      if (correctAnswerIndex) {
        document
          .querySelector('.options')
          ?.children[correctAnswerIndex].classList.add('correct');
      }
    }


  }
}

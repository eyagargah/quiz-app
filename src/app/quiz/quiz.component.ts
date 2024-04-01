import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'app/quiz.service';

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
  constructor(private router: Router , private quizService : QuizService) {}
  header : any
  subjectIcon: any
  ngOnInit() {
    this.header = document.querySelector('.header')
    this.subjectIcon = this.header.children[0]
    this.options = document.querySelectorAll('.option');
    this.submitBtn = document.querySelector('.submitBtn');
    this.questionsData = JSON.parse(localStorage.getItem('questions')!);
    this.questions = this.questionsData[this.i];
    
    this.icon= this.quizService.getIcon()
    this.title = this.quizService.getTitle()

    this.subjectIcon.children[0].src = "./assets/icons/"+ this.icon
    this.subjectIcon.children[1].innerHTML = this.title
    
    
    console.log(this.subjectIcon.children[0])
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
    if (this.submitBtn?.innerHTML == 'Submit Answer') {
      if(selectedAnswer.children[1].id == correctAnswerIndex){
       selectedAnswer.classList.add('correct')
        this.score+=1
        this.quizService.setScore(this.score)

      }
      else {
        selectedAnswer.classList.add('wrong')
        document.querySelector('.options')?.children[correctAnswerIndex].classList.add('correct')
       
      }
      this.submitBtn.innerHTML = 'Next Question'
      
    }else {
      if (this.i < 9) {
        this.submitBtn.innerHTML = 'Submit Answer';
        this.submitBtn.setAttribute('disabled','')
        this.i += 1;
        this.questions = this.questionsData[this.i];
       this.restartQuiz()
      } else if (this.i == 9) {
        this.router.navigate(['score']);
      } else if (this.i == 8) {
        this.submitBtn.innerHTML = 'Submit Quiz';
      }
    }
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

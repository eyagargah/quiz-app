import { Component } from '@angular/core';
import  quizzesData from '../../assets/quizes.json';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
   questions:any;
   data = quizzesData.quizzes;
   ngOnInit(){
    console.log(this.data[0].title)
   }

   getQuizQuestions(e:any , i:any){
    
    this.questions = this.data[i].questions;
   }

}

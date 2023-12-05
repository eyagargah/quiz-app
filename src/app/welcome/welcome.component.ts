import { Component } from '@angular/core';
import  quizzesData from '../../assets/quizes.json';
import { Router } from '@angular/router';
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


   constructor(private router:Router){}

   getQuizQuestions(e:any , i:any){
    
    this.questions = this.data[i].questions;
    this.router.navigateByUrl('quiz');
   }

}

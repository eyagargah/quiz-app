import { Component } from '@angular/core';
import  quizzesData from '../../assets/quizes.json';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  
   data = quizzesData.quizzes;
   ngOnInit(){
    console.log(this.data[0].title)
   }

}

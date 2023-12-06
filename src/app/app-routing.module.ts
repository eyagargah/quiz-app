import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ScoreComponent } from './score/score.component';

const routes: Routes = [
  {path : '' , component: WelcomeComponent},
  {path : 'quiz' , component: QuizComponent},
  {path : 'score' , component: ScoreComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }

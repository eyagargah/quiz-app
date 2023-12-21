import { Injectable } from '@angular/core';
import  quizzesData from '../assets/quizes.json';
@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  questions : any = []
  title : string | undefined;
  icon : any;
  quizzesData : any;
  score : any;
  setQuizzesData(){
    this.quizzesData = quizzesData;
    localStorage.setItem('quizzes' , JSON.stringify(this.quizzesData))

  }
  getQuizzesData(){
    return this.quizzesData;
  }

 setSubjectQuestions(i:any){
    this.questions = this.quizzesData.quizzes[i].questions;
    localStorage.setItem('questions' , JSON.stringify(this.questions))
 }
  getSubjectQuestions(){ 
    return this.questions
  }

getScore(){
  return this.score
}
setScore(currentScore : any){
  this.score = currentScore
}

getTitle(){
  return this.title
}

setTitle( title:any){
  this.title = title
}

getIcon(){
  return this.icon
}

setIcon(icon:any){
  this.icon = icon
}

}

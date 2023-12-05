import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }

  questions : any = []
  title : string | undefined;
  icon : any;
  setSubjectQuestions(subjectQuestions : any){
    this.questions = subjectQuestions
  }
  getSubjectQuestions(){
    return this.questions
  }

  setTitle(subjectTitle : any){
    this.title = subjectTitle
  }
  getTitle(){
    return this.title
  }

  setIcon(subjectIcon : any){
    this.icon = subjectIcon
  }
  getIcon(){
    return this.icon
  }


}

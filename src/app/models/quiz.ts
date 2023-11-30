import { Question } from "./question";

export interface Quiz{
    title:string;
    icon:string;
    questions:Array<Question>;
}



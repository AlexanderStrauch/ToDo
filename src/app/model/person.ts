import { TodoTask } from "./todoTask";

export class Person {
    tasks:TodoTask[] = []
    
    constructor(
        public id:number,
        public firstname:string,
        public lastname:string,
        public email:string
    ) { }
}
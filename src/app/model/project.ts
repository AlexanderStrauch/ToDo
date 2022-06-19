import { TodoTask } from "./todoTask";

export class Project {
    tasks:TodoTask[] = [];
    
    constructor(
        public id:number,
        public title:string,
        public customer:string
    ) { }
}
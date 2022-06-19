import { Person } from "./person";

export class TodoTask {
    assignee!:Person;

    constructor(
        public id:number,
        public title:string,
        public details:string,
        public completed:boolean,
        public dateCreated:Date,
        public dateFinished?:Date
    ) { }
}
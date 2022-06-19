import { Person } from "./person";

export class Task {
    assignee!:Person;

    constructor(
        public id:string,
        public title:string,
        public details:string,
        public completed:boolean,
        public dateCreated:Date,
        public dateFinished?:Date
    ) { }
}
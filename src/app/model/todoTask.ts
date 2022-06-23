import { Person } from "./person";
import { Project } from "./project";

export class TodoTask {
    constructor(
        public id:number,
        public title:string,
        public details:string,
        public completed:boolean,
        public dateCreated:Date,

        public asignee:Person,
        public project:Project,
        public dateFinished?:Date
    ) { }
}
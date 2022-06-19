export class Project {
    tasks:Task[] = [];
    
    constructor(
        public id:string,
        public title:string,
        public customer:string
    ) { }
}
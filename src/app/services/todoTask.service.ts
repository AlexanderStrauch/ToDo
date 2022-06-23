import { Injectable } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Person } from '../model/person';
import { TodoTask } from '../model/todoTask';
import { PersonService } from './person.service';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})

export class TodoTaskService {
  @Output() changed = new EventEmitter();
  objects!:TodoTask[];

  constructor(
    private personService:PersonService,
    private projectService:ProjectService
  ) { }

  async getAll():Promise<TodoTask[]> {
    if (this.objects == null)
      await this.createTestData();

    return this.objects.slice();
  }

  private async createTestData() {
    let persons = await this.personService.getAll();
    let projects = await this.projectService.getAll();

    let p1 = new TodoTask(1, "Fix performance issues", "Long loading times", false, new Date(2022, 0, 1, 10, 30), persons[0], projects[0]);
    let p2 = new TodoTask(2, "Fix CSS", "Get some colours", false, new Date(2022, 0, 2, 11, 30), persons[0], projects[1]);
    let p3 = new TodoTask(3, "Find more bugs", "This is a detailed description", false, new Date(2022, 0, 3, 12, 30), persons[1], projects[2]);
    let p4 = new TodoTask(4, "Fix more bugs", "This is also a detailed description", true, new Date(2022, 0, 4, 13, 30), persons[1], projects[2]);
    p4.dateFinished = new Date(2022, 0, 5, 12, 0)
    let p5 = new TodoTask(5, "Code Review", "Need to review some code", false, new Date(2022, 0, 5, 14, 30), persons[2], projects[1]);
    let p6 = new TodoTask(6, "Create new feature branch", "Currently everything is in master branch", false, new Date(2022, 0, 6, 15, 30), persons[2], projects[0]);

    this.objects = [p1, p2, p3, p4, p5, p6];
  }

  async remove(obj:TodoTask):Promise<void> {
    let index = this.objects.findIndex(x => x.id == obj.id);
    this.objects.splice(index, 1);
    this.changed.emit();
  }

  async get(id:number):Promise<TodoTask> {
    let index = this.objects.findIndex(x => x.id == id);

    if (index != -1) {
      return this.objects[index];
    } else {
      throw "Object with that ID not found!";
    }
  }

  async save(obj:TodoTask):Promise<void> {
    let index = this.objects.findIndex(x => x.id == obj.id);

    if (index >= 0) {
      this.objects[index] = obj;
    } else {
      let nextID = this.getNextId()
      obj.id = nextID
      this.objects.push(obj);
    }

    this.changed.emit();
  }

  getNextId():number{
    let nextID = Math.max.apply(Math, this.objects.map(o => o.id)) + 1

    return nextID
  }
}

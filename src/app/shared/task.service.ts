import { Injectable } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { TodoTask } from '../model/todoTask';

@Injectable({
  providedIn: 'root'
})

export class TodoTaskService {
  @Output() changed = new EventEmitter();
  objects!:TodoTask[];

  constructor() { }

  async getAll():Promise<TodoTask[]> {
    if (this.objects == null)
      await this.createTestData();

    return this.objects.slice();
  }

  private async createTestData() {
    let p1 = new TodoTask(1, "Fix performance issues", "In manchen Browsern lädt die Website extrem langsam", false, new Date());
    let p2 = new TodoTask(2, "task2", "details2", false, new Date());
    let p3 = new TodoTask(3, "task3", "details3", false, new Date());
    let p4 = new TodoTask(4, "task4", "details4", false, new Date());
    let p5 = new TodoTask(5, "task5", "details5", false, new Date());
    let p6 = new TodoTask(6, "task6", "details6", false, new Date());
    let p7 = new TodoTask(7, "task7", "details7", false, new Date());
    let p8 = new TodoTask(8, "task8", "details8", false, new Date());
    let p9 = new TodoTask(9, "task39", "details9", false, new Date());

    this.objects = [p1, p2, p3];
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
      let nextID = Math.max.apply(Math, this.objects.map(o => o.id))
      obj.id = nextID
      this.objects.push(obj);
    }

    this.changed.emit();
  }
}

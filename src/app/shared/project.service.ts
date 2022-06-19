import { Injectable } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  @Output() changed = new EventEmitter();
  objects!:Project[];

  constructor() { }

  async getAll():Promise<Project[]> {
    if (this.objects == null)
      await this.createTestData();

    return this.objects.slice();
  }

  private async createTestData() {
    let p1 = new Project(1, "Angular Website", "Edeka");
    let p2 = new Project(2, "Lernapp ISD", "HSHL");
    let p3 = new Project(3, "Betriebsfeier", "Firma");
    this.objects = [p1, p2, p3];
  }

  async remove(obj:Project):Promise<void> {
    let index = this.objects.findIndex(x => x.id == obj.id);
    this.objects.splice(index, 1);
    this.changed.emit();
  }

  async get(id:number):Promise<Project> {
    let index = this.objects.findIndex(x => x.id == id);

    if (index != -1) {
      return this.objects[index];
    } else {
      throw "Object with that ID not found!";
    }
  }

  async save(obj:Project):Promise<void> {
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

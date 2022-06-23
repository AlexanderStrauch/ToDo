import { Injectable } from '@angular/core';
import { Person } from '../model/person';
import { Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PersonService {
  @Output() changed = new EventEmitter();
  objects!:Person[];

  constructor() { }

  async getAll():Promise<Person[]> {
    if (this.objects == null)
      await this.createTestData();

    return this.objects.slice();
  }

  private async createTestData() {
    let p1 = new Person(1, "Alexander", "Strauch", "alexander.strauch@stud.hshl.de");
    let p2 = new Person(2, "Rolf", "Müller", "rolf@müller.de");
    let p3 = new Person(3, "Mark", "Zuckerberg", "mark@meta.com");
    this.objects = [p1, p2, p3];
  }

  async remove(obj:Person):Promise<void> {
    let index = this.objects.findIndex(x => x.id == obj.id);
    this.objects.splice(index, 1);
    this.changed.emit();
  }

  async get(id:number):Promise<Person> {
    console.log("Getting Person with ID" + id);
    if (this.objects == null)
    await this.createTestData();

    let index = this.objects.findIndex(x => x.id == id);

    if (index != -1) {
      return this.objects[index];
    } else {
      throw "Object with that ID not found!";
    }
  }

  async save(obj:Person):Promise<void> {
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

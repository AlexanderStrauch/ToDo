import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoTask } from 'src/app/model/todoTask';
import { PersonService } from 'src/app/services/person.service';
import { ProjectService } from 'src/app/services/project.service';
import { TodoTaskService } from 'src/app/services/todoTask.service';

@Component({
  selector: 'app-todoTask-list',
  templateUrl: './todoTask-list.component.html',
  styleUrls: ['./todoTask-list.component.css']
})
export class TodoTaskListComponent implements OnInit {
  objects:TodoTask[] = [];
  objectsOpen:TodoTask[] = [];
  objectsCompleted:TodoTask[] = [];
  selected:TodoTask;

  constructor(
    private service:TodoTaskService,
    private personService:PersonService,
    private projectService:ProjectService,
    private router:Router) { }

  async ngOnInit() {
    this.objects = await this.service.getAll();
    this.objectsOpen = this.objects.slice().filter(item => item.completed == false);
    this.objectsCompleted = this.objects.slice().filter(item => item.completed == true);

    this.service.changed.subscribe(async () => {
      this.objects = await this.service.getAll();
      this.objectsOpen = this.objects.slice().filter(item => item.completed == false);
      this.objectsCompleted = this.objects.slice().filter(item => item.completed == true);
    });
  }
  
  onSelect(obj:TodoTask) {
    this.selected = obj;
  }

  isSelected() {
    return this.selected != null;
  }

  async onDelete() {
    if (!this.isSelected())
      return;
    
    let person = await  this.personService.get(this.selected.asignee.id)
    await this.personService.removeTaskFromPerson(person, this.selected)

    let project = await this.projectService.get(this.selected.project.id)
    this.projectService.removeTaskFromProject(project, this.selected)
    
    this.service.remove(this.selected);
    this.selected = null;
  }

  onEdit() {
    this.router.navigate(['/todoTask', this.selected.id]);
  }

  onAdd() {
    this.router.navigate(['/todoTask/0']);
  }
}
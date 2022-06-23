import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/model/person';
import { TodoTask } from 'src/app/model/todoTask';
import { PersonService } from 'src/app/services/person.service';
import { ProjectService } from 'src/app/services/project.service';
import { TodoTaskService } from 'src/app/services/todoTask.service';

@Component({
  selector: 'app-todoTask-edit',
  templateUrl: './todoTask-edit.component.html',
  styleUrls: ['./todoTask-edit.component.css']
})
export class TodoTaskEditComponent implements OnInit {
  id:number = null;
  obj:TodoTask = null;
  form:FormGroup;
  persons:Person[] = [];

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service:TodoTaskService,
    private personService:PersonService,
    private projectService:ProjectService) { 
      this.form = new FormGroup({
        title: new FormControl("", [Validators.required, Validators.minLength(3)]),
        details: new FormControl("", [Validators.required, Validators.minLength(3)]),
        completed: new FormControl(false, [Validators.required]),
        assignee: new FormControl([], [Validators.required]),
        project:  new FormControl([], [Validators.required])
      });
    };

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.persons = await this.personService.getAll();
    
    if (this.id != null && this.id != 0) {
      this.obj = await this.service.get(this.id);
    } else {
      this.obj = new TodoTask(this.service.getNextId(), "", "", false, null, null, null);
    }

    this.form.setValue({
      title: this.obj.title,
      details: this.obj.details,
      completed: this.obj.completed,
      assignee: this.obj.asignee,
      project: this.obj.project
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.obj.title = this.form.controls.title.value
    this.obj.details = this.form.controls.details.value;
    this.obj.completed = this.form.controls.completed.value;
    if(this.obj.completed == true){
      this.obj.dateFinished = new Date();
    }
    this.obj.asignee = this.form.controls.assignee.value;
    this.obj.project = this.form.controls.project.value;

    this.obj.project.tasks.push(this.obj)
    this.projectService.save(this.obj.project)

    this.obj.asignee.tasks.push(this.obj)
    this.personService.save(this.obj.asignee)

    if(this.obj.dateCreated == null){
      this.obj.dateCreated = new Date()
    }

    this.service.save(this.obj);
    this.router.navigate(["todoTask"]);
  }

  onCancel() {
    this.router.navigate(['/todoTask']);
  }
}

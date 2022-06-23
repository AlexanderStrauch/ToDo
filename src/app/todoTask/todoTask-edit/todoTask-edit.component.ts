import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoTask } from 'src/app/model/todoTask';
import { TodoTaskService } from 'src/app/shared/todoTask.service';

@Component({
  selector: 'app-todoTask-edit',
  templateUrl: './todoTask-edit.component.html',
  styleUrls: ['./todoTask-edit.component.css']
})
export class TodoTaskEditComponent implements OnInit {
  id:number = null;
  obj:TodoTask = null;
  form:FormGroup;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service:TodoTaskService) { 
      this.form = new FormGroup({
        title: new FormControl("", [Validators.required, Validators.minLength(3)]),
        details: new FormControl("", [Validators.required, Validators.minLength(3)]),
        completed: new FormControl("", [Validators.required, Validators.minLength(3)])
      });
    };

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    if (this.id != null && this.id != 0) {
      this.obj = await this.service.get(this.id);
    } else {
      this.obj = new TodoTask(this.service.getNextId(), "", "", false, null);
    }

    this.form.setValue({
      title: this.obj.title,
      details: this.obj.details,
      completed: this.obj.completed
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

    this.obj.dateCreated = new Date();
    this.service.save(this.obj);
    this.router.navigate(["todoTask"]);
  }

  onCancel() {
    this.router.navigate(['/todoTask']);
  }
}

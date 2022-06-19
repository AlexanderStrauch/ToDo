import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/shared/project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  id:number = null;
  obj:Project = null;
  form:FormGroup;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service:ProjectService) { 
      this.form = new FormGroup({
        title: new FormControl("", [Validators.required, Validators.minLength(3)]),
        customer: new FormControl("", [Validators.required, Validators.minLength(3)])
      });
    };

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    if (this.id != null) {
      this.obj = await this.service.get(this.id);
    } else {
      this.obj = new Project(null, "", "");
    }

    this.form.setValue({
      title: this.obj.title,
      customer: this.obj.customer
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.obj.title = this.form.controls.title.value
    this.obj.customer = this.form.controls.customer.value;
    this.service.save(this.obj);
    this.router.navigate(["project"]);
  }

  onCancel() {
    this.router.navigate(['/project']);
  }
}

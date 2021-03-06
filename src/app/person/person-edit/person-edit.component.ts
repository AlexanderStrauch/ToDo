import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/model/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
  id:number = null;
  obj:Person = null;
  form:FormGroup;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service:PersonService) { 
      this.form = new FormGroup({
        firstname: new FormControl("", [Validators.required, Validators.minLength(3)]),
        lastname: new FormControl("", [Validators.required, Validators.minLength(3)]),
        email: new FormControl("", [Validators.required, Validators.email])
      });
    };

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    if (this.id != null && this.id != 0) {
      this.obj = await this.service.get(this.id);
    } else {
      this.obj = new Person(this.service.getNextId(), "", "", "");
    }

    this.form.setValue({
      firstname: this.obj.firstname,
      lastname: this.obj.lastname,
      email: this.obj.email
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.obj.id = this.service.getNextId()
    this.obj.firstname = this.form.controls.firstname.value;
    this.obj.lastname = this.form.controls.lastname.value;
    this.obj.email = this.form.controls.email.value;
    this.service.save(this.obj);
    this.router.navigate(["person"]);
  }

  onCancel() {
    this.router.navigate(['/person']);
  }
}

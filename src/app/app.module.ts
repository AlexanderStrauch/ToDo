import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PersonEditComponent } from './person/person-edit/person-edit.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { PersonSingleSelectComponent } from './person/person-single-select/person-single-select.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectSingleSelectComponent } from './project/project-single-select/project-single-select.component';
import { PersonService } from './services/person.service';
import { ProjectService } from './services/project.service';
import { TodoTaskService } from './services/todoTask.service';
import { TodoTaskEditComponent } from './todoTask/todoTask-edit/todoTask-edit.component';
import { TodoTaskListComponent } from './todoTask/todoTask-list/todoTask-list.component';
import { TodoTaskSingleSelectComponent } from './todoTask/todoTask-single-select/todoTask-single-select.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    PersonEditComponent,
    PersonSingleSelectComponent,

    ProjectListComponent,
    ProjectEditComponent,
    ProjectSingleSelectComponent,

    TodoTaskListComponent,
    TodoTaskEditComponent,
    TodoTaskSingleSelectComponent,

    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    PersonService,
    ProjectService,
    TodoTaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { ProjectingleSelectComponent } from './project/project-single-select/project-single-select.component';
import { PersonService } from './shared/person.service';
import { ProjectService } from './shared/project.service';
import { TodoTaskService } from './shared/task.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    PersonEditComponent,
    PersonSingleSelectComponent,

    ProjectListComponent,
    ProjectEditComponent,
    ProjectingleSelectComponent,

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

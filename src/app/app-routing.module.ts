import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PersonEditComponent } from './person/person-edit/person-edit.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { TodoTaskEditComponent } from './todoTask/todoTask-edit/todoTask-edit.component';
import { TodoTaskListComponent } from './todoTask/todoTask-list/todoTask-list.component';

const routes: Routes = [
  { path: 'person', component: PersonListComponent },
  { path: 'person/:id', component: PersonEditComponent },

  { path: 'project', component: ProjectListComponent },
  { path: 'project/:id', component: ProjectEditComponent },  

  { path: 'todoTask', component: TodoTaskListComponent },
  { path: 'todoTask/:id', component: TodoTaskEditComponent },
  
  { path: '', redirectTo: 'todoTask', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/shared/project.service';
import { Project } from '../../model/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  objects:Project[] = [];
  selected:Project;

  constructor(
    private service:ProjectService,
    private router:Router) { }

  async ngOnInit() {
    this.objects = await this.service.getAll();
    this.service.changed.subscribe(async () => {
      this.objects = await this.service.getAll();
    });
  }
  
  onSelect(obj:Project) {
    this.selected = obj;
  }

  isSelected() {
    return this.selected != null;
  }

  onDelete() {
    if (!this.isSelected())
      return;
    
    this.service.remove(this.selected);
    this.selected = null;
  }

  onEdit() {
    this.router.navigate(['/project', this.selected.id]);
  }

  onAdd() {
    this.router.navigate(['/project/0']);
  }
}
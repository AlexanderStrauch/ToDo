import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/shared/project.service';

@Component({
  selector: 'app-project-single-select',
  templateUrl: './project-single-select.component.html',
  styleUrls: ['./project-single-select.component.css'],
  providers: [
    {
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => ProjectingleSelectComponent),
       multi: true
    }
 ]
})
export class ProjectingleSelectComponent implements OnInit, ControlValueAccessor {
  selected:Project = null;
  all:Project[] = [];

  onChanged: any = () => { };
  onTouched: any = () => { };
  disabled = false;

  constructor(private service:ProjectService) { }

  writeValue(element: Project): void {
    this.selected = element;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  async ngOnInit() {
    this.all = await this.service.getAll();
  }

  isSelected(obj:Project):boolean {
    return this.selected != null && obj.id == this.selected.id;
  }

  onSelectChanged(id:number) {
    let index = this.all.findIndex(x => x.id == id);
    this.selected = this.all[index];
    this.onChanged(this.selected);
  }
}
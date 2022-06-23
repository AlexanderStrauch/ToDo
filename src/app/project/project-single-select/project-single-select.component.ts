import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-single-select',
  templateUrl: './project-single-select.component.html',
  styleUrls: ['./project-single-select.component.css'],
  providers: [
    {
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => ProjectSingleSelectComponent),
       multi: true
    }
 ]
})
export class ProjectSingleSelectComponent implements OnInit, ControlValueAccessor {
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

  onSelectChanged(event:Event) {
    let id = Number((event.target as HTMLInputElement).value)
    let index = this.all.findIndex(x => x.id == id);
    this.selected = this.all[index];
    this.onChanged(this.selected);
  }
}
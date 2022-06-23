import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TodoTask } from 'src/app/model/todoTask';
import { TodoTaskService } from 'src/app/shared/todoTask.service';

@Component({
  selector: 'app-todoTask-single-select',
  templateUrl: './todoTask-single-select.component.html',
  styleUrls: ['./todoTask-single-select.component.css'],
  providers: [
    {
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => TodoTaskSingleSelectComponent),
       multi: true
    }
 ]
})
export class TodoTaskSingleSelectComponent implements OnInit, ControlValueAccessor {
  selected:TodoTask = null;
  all:TodoTask[] = [];

  onChanged: any = () => { };
  onTouched: any = () => { };
  disabled = false;

  constructor(private service:TodoTaskService) { }

  writeValue(element: TodoTask): void {
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

  isSelected(obj:TodoTask):boolean {
    return this.selected != null && obj.id == this.selected.id;
  }

  onSelectChanged(event:Event) {
    let id = Number((event.target as HTMLInputElement).value)
    let index = this.all.findIndex(x => x.id == id);
    this.selected = this.all[index];
    this.onChanged(this.selected);
  }
}
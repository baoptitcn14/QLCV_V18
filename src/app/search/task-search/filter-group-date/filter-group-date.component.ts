import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
// import { DynamicFormComponent, IControl } from '../../dynamic-form/dynamic-form.component';
// import { DialogFooterComponent } from '../../shared/dialog-partials/dialog-footer/dialog-footer.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
// import { DialogFooterDirective } from '../../shared/directives/dialog-footer.directive';

@Component({
  selector: 'app-filter-group-date',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    InputIconModule,
    InputTextareaModule,
    InputTextModule,
    
  ],
  templateUrl: './filter-group-date.component.html',
  styleUrl: './filter-group-date.component.scss'
})
export class FilterGroupDateComponent {

  constructor(
    private dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  onSave() { }

}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
// import { DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
// import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'dialog-footer',
  templateUrl: './dialog-footer.component.html',
  styleUrls: ['./dialog-footer.component.scss'],
  standalone: true,
  imports: [CommonModule, 
    ButtonModule, 
    // ToastModule
  ],
})
export class DialogFooterComponent {
  @Input({ required: true }) isNew: boolean | undefined = false;
  @Input({ required: true }) isValid: boolean | undefined = false;

  @Output() onSaveEvent = new EventEmitter();
  @Output() onDeleteEvent = new EventEmitter();
  @Output() onCloseEvent = new EventEmitter();

  isDelete = false;

  constructor() {}

  onSave() {
    this.onSaveEvent.emit();
  }

  onDelete() {
    this.isDelete = true;
  }

  onCancelDelete() {
    this.isDelete = false;
  }

  onConfirmDelete() {
    this.onDeleteEvent.emit();
  }

  closeDialog() {
    this.onCloseEvent.emit();
  }
}

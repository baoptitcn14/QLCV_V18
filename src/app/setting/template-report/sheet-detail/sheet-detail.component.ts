import { Component,OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogTest2Component } from '../../../shared/dialog-partials/dialog-test-2/dialog-test-2.component';

@Component({
  selector: 'app-sheet-detail',
  standalone: true,
  imports: [ButtonModule,InputTextModule,ReactiveFormsModule],
  templateUrl: './sheet-detail.component.html',
  styleUrl: './sheet-detail.component.scss'
})
export class SheetDetailComponent implements OnInit{

  constructor(
    private dialogService: DialogService,
    private ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
  }
  onShowDialog() {
    this.dialogService.open(DialogTest2Component, {
      // đặt 1 class cho dialog e.g "demo-test-2-dialog"
      styleClass: 'p-dialog-custom demo-test-2-dialog',
    });
  }

}

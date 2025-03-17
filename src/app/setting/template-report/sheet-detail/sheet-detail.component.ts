import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogTest2Component } from '../../../shared/dialog-partials/dialog-test-2/dialog-test-2.component';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-sheet-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FloatLabelModule,
    DialogModule,
    CheckboxModule,
    DropdownModule,
    ConfirmDialogModule
  ],
   providers: [ConfirmationService],
  templateUrl: './sheet-detail.component.html',
  styleUrl: './sheet-detail.component.scss',
  
})
export class SheetDetailComponent implements OnInit {
  value1: string | undefined;
  search: string | undefined;

  // Danh sách dữ liệu của bảng
  data: any[] = [
    // { dataType: 'Text', configType: 'Trường' }
  ];

  // Danh sách loại dữ liệu
  dataTypes = [
    { label: 'Yes/ No', value: 'Yes/ No' },
    { label: 'Text', value: 'Text' },
    { label: 'Number', value: 'Number' },
    { label: 'Date', value: 'Date' }
  ];

  // Danh sách loại cấu hình
  configTypes = [
    { label: 'Trường', value: 'Trường' },
    { label: 'Bảng', value: 'Bảng' },
  ];

  constructor(
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private confirmationService: ConfirmationService 
  ) {}

  ngOnInit(): void {}

  onShowDialog() {
    this.dialogService.open(DialogTest2Component, {
      // đặt 1 class cho dialog e.g "demo-test-2-dialog"
      styleClass: 'p-dialog-custom demo-test-2-dialog',
    });
  }

  // Xóa hàng theo index
  removeRow(index: number) {
    if (this.data.length > 1) {
      this.data.splice(index, 1);
    }
  }
  confirmRemoveRow(index: number) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xoá dòng này không?',
      header: 'Xác nhận xoá',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Xoá',
      rejectLabel: 'Huỷ',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.removeRow(index);
      }
    });
  }

  // Thêm hàng mới
  addRow() {
    this.data.push({ dataType: '', configType: '' });
  }
}

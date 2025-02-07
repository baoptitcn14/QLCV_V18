import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DialogFooterComponent } from '../../shared/dialog-partials/dialog-footer/dialog-footer.component';
import { CommonModule } from '@angular/common';
import { TieuChiDto } from '../../shared/service-proxies/qlcv-service-proxies';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TooltipModule } from 'primeng/tooltip';
import { DialogFooterDirective } from '../../shared/directives/dialog-footer.directive';

@Component({
  selector: 'app-tieu-chi-dialog',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    DialogFooterComponent,
    ReactiveFormsModule,
    ConfirmPopupModule,
    TooltipModule,
    FormsModule,
    DialogFooterDirective
  ],
  providers: [ConfirmationService],
  templateUrl: './tieu-chi-dialog.component.html',
  styleUrl: './tieu-chi-dialog.component.scss',
})
export class TieuChiDialogComponent implements OnInit {
  tieuChi?: TieuChiDto;
  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    listThongSo: new FormArray([]),
  });

  constructor(
    private ref: DynamicDialogRef,
    private confirmationService: ConfirmationService,
    public config: DynamicDialogConfig,
    private messageService: MessageService
  ) {}

  /**
   * Initializes the component by checking if there is an existing `tieuChi` object.
   * If `tieuChi` is present, it patches the form with the values from `tieuChi`,
   * specifically updating the `listThongSo` and `title` fields.
   */

  ngOnInit(): void {
    this.tieuChi = this.config.data?.tieuChi;

    if (this.tieuChi) {
      this.form.patchValue({
        title: this.tieuChi.title,
      });

      this.tieuChi.listThongSo?.forEach((item) => {
        this.listThongSo.controls.push(new FormControl(item));
      });
    }

    this.listThongSo.controls.push(new FormControl(''));
  }

  get listThongSo() {
    return this.form.get('listThongSo') as FormArray;
  }

  onDeleteThongSo(index: number, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Bạn có muốn xóa thông số này?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.listThongSo.removeAt(index);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Đã xóa thông số',
          life: 3000,
        });
      },
    });
  }

  onAddThongSo() {
    this.listThongSo.push(new FormControl(''));
  }

  onHide() {
    this.ref.close();
  }

  onSave() {
    this.listThongSo.controls.forEach((control, index) => {
      if (control.value == '') {
        this.listThongSo.removeAt(index);
      }
    });

    this.ref.close(this.form.value);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { DialogFooterComponent } from '../dialog-footer/dialog-footer.component';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogTest2Component } from '../dialog-test-2/dialog-test-2.component';

@Component({
  selector: 'app-dialog-test',
  standalone: true,
  imports: [DialogFooterComponent, ButtonModule],
  templateUrl: './dialog-test.component.html',
  styleUrl: './dialog-test.component.scss',
})
export class DialogTestComponent implements OnInit {
  isNew!: boolean;

  constructor(
    private dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.isNew = this.config.data.isNew;
    
  }

  onShowDialog() {
    this.dialogService.open(DialogTest2Component, {
      styleClass: 'p-dialog-custom',
    })
  }
}

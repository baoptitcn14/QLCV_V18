import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogTestComponent } from '../../shared/dialog-partials/dialog-test/dialog-test.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ButtonModule],
  providers: [DialogService],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  constructor(private dialogService: DialogService) {}
  openPasswordDialog() {
    this.dialogService.open(DialogTestComponent, {
      header: 'Select a Product',
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      styleClass: 'p-dialog-custom',
      maximizable: true,
      data: {
        isNew: true,
      },
    });
  }
}

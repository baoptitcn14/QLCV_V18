import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { DetailComponent } from './detail/detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-handover',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './work-handover.component.html',
  styleUrl: './work-handover.component.scss'
})
export class WorkHandoverComponent {

  constructor(
    private dialogService: DialogService,
    private router: Router
    ) {}

    statusFilters = [
      { label: 'Tất cả', value: null },
      { label: 'Đã duyệt', value: 'approved' },
      { label: 'Phê duyệt thay đổi', value: 'pending' },
      { label: 'Từ chối', value: 'refuse' },
  
    ];

  openWorkDetail(){
    this.router.navigate(['/category-work-handover/detail']);
  }

}

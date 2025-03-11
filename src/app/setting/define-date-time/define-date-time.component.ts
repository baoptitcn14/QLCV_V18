import { DropdownModule } from 'primeng/dropdown';
import { Component, Input, ViewChild, TemplateRef, AfterViewInit, Signal, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-define-date-time',
  standalone: true,
  imports: [   
    CommonModule,
    FieldsetModule,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule
   ],
  templateUrl: './define-date-time.component.html',
  styleUrl: './define-date-time.component.scss'
})
export class DefineDateTimeComponent implements AfterViewInit {
  @Input() defineDateTime: Record<string, any> = { value: {} };
  @Input() listDayOfWeek: string[] = [];
  @Input() listDayInMonth: number[] = [];
  @Input() iconAlign: 'left' | 'right' = 'left'

  congViecData: any = {};  
  duLieuData: any = {};    

  onSave = { emit: () => console.log('Lưu dữ liệu') };
  onReload = { emit: () => console.log('Làm mới dữ liệu') };
  listOptions = [
    { label: 'congViecData', value: 'TASK' },
    { label: 'duLieuData', value: 'DATA' }
  ];
  selectedOption: string = 'TASK';

  @ViewChild('weekTemplate')    weekTemplate!: TemplateRef<any>;
  @ViewChild('monthTemplate')   monthTemplate!: TemplateRef<any>;
  @ViewChild('quarterTemplate') quarterTemplate!: TemplateRef<any>;
  @ViewChild('yearTemplate')    yearTemplate!: TemplateRef<any>;


  loadData() {
    // Giả lập dữ liệu  
    this.congViecData = {
      WEEK: 'Thứ Hai',
      MONTH: 'Ngày 1',
      QUARTER: '01/04',
      YEAR: '2024'
    };

    this.duLieuData = {
      WEEK: 'Thứ Ba',
      MONTH: 'Ngày 15',
      QUARTER: '01/07',
      YEAR: '2025'
    };
  }

  configLayout = signal<any[]>([]);  // Dùng Signal API thay vì setTimeout

  ngAfterViewInit(): void {
    this.configLayout.set([
      {
        headerLeft: 'Định nghĩa tuần làm việc',
        headerRight: 'Chọn ngày đầu tuần',
        key: 'WEEK',
        template: this.weekTemplate,
      },
      {
        headerLeft: 'Định nghĩa tháng làm việc',
        headerRight: 'Chọn ngày đầu tháng',
        key: 'MONTH',
        template: this.monthTemplate,
      },
      {
        headerLeft: 'Định nghĩa quý làm việc',
        headerRight: 'Chọn ngày đầu tiên của quý một (Q1)',
        key: 'QUARTER',
        template: this.quarterTemplate,
      },
      {
        headerLeft: 'Định nghĩa năm làm việc',
        headerRight: 'Chọn ngày đầu tiên của năm',
        key: 'YEAR',
        template: this.yearTemplate,
      },
    ]);
  }

  chonNgayThang(event: Date, type: 'QUARTER' | 'YEAR') {
    if (event) {
      const value = new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit' }).format(event);
      this.defineDateTime[value][type] = value;
    }
  }
}

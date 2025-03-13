import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-template-report',
  standalone: true,
  imports: [CommonModule,FormsModule, DropdownModule, FileUploadModule, ButtonModule, TableModule,RippleModule],
  templateUrl: './template-report.component.html',
  styleUrl: './template-report.component.scss'
})
export class TemplateReportComponent {

  selectedEmailOption: string = 'work'; // Giá trị mặc định
  emailOptions = [
    { label: 'Công việc', value: 'work' },
    { label: 'Data', value: 'data' }
  ];

  reports = [
    {
      name: 'TEMPLATE_P1+2.xlsx',
      sheets: ['Data-P1+2', 'SHEET NAME TEST']
    },
    {
      name: 'TEMPLATE_P1+2TL.xlsx',
      sheets: ['DATA P1+2 Tương Lai']
    }
  ];

  onFileUpload(event: any) {
    console.log('File uploaded:', event.files);
  }
  openFile() {
    console.log('Mở file upload');
  }

  toggleReport(report: any) {
    report.expanded = !report.expanded;
  }
}

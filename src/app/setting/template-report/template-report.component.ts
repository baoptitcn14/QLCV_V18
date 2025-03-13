import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-template-report',
  standalone: true,
  imports: [FormsModule, DropdownModule, FileUploadModule, ButtonModule, TableModule],
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

  customUpload(event: any) {
    const files = event.files;
    console.log('Files ready for upload:', files);

    for (const file of files) {
      console.log('Uploading file:', file);
      const formData = new FormData();
      formData.append('files', file);

      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => console.log('Upload successful:', data))
        .catch(error => console.error('Upload failed:', error));
    }
  }
  openFile(){

    
  }
}

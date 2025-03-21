import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-task-search',
  standalone: true,
  imports: [DropdownModule,FileUploadModule,TableModule, ChipModule,TabViewModule,ToolbarModule,ButtonModule],
  templateUrl: './task-search.component.html',
  styleUrl: './task-search.component.scss'
})
export class TaskSearchComponent {

  users = [
    { label: 'Tất cả', value: null },
    { label: 'Nguyễn Văn A', value: 'user1' },
    { label: 'Trần Thị B', value: 'user2' }
  ];

  timeFilters = [
    { label: 'Tất cả', value: null },
    { label: 'Hôm nay', value: 'today' },
    { label: 'Tuần này', value: 'this_week' }
  ];

  statusFilters = [
    { label: 'Đã duyệt', value: 'approved' },
    { label: 'Chờ xử lý', value: 'pending' },
    { label: 'Tất cả', value: null }
  ];

  uploadedFiles: string[] = [
    'TEMPLATE_P1+2.xlsx',
    'TEMPLATE_P1+2TL.xlsx'
  ];

  onUpload(event: any) {
    // Giả lập thêm file vào danh sách
    this.uploadedFiles.push(`UploadedFile_${this.uploadedFiles.length + 1}.xlsx`);
  }

  removeFile(file: string) {
    this.uploadedFiles = this.uploadedFiles.filter(f => f !== file);
  }

  refreshList() {
    console.log('Làm mới danh sách công việc');
  }

}

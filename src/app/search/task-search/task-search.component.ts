import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UploadTemplateComponent } from './upload-template/upload-template.component';
import { FilterGroupDateComponent } from './filter-group-date/filter-group-date.component';

@Component({
  selector: 'app-task-search',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    DropdownModule,
    FileUploadModule,
    TableModule,
    ChipModule,
    TabViewModule,
    ToolbarModule,
    ButtonModule,
    CalendarModule,
    SplitButtonModule],
  templateUrl: './task-search.component.html',
  styleUrl: './task-search.component.scss'
})
export class TaskSearchComponent {
  constructor(
    private dialogService: DialogService
    ) {}

  ref: DynamicDialogRef | undefined;

  frequencyFilters  = [
    { label: 'Tất cả', value: null },
    { label: 'Ngày', value: 'today' },
    { label: 'Tuần', value: 'this_week' },
    { label: 'Tháng', value: 'month' },
    { label: 'Quý', value: 'quy' },
    { label: 'Năm', value: 'year' }
  ];
  frequencyMap: { [key: string]: string } = {
    today: "Ngày",
    this_week: "Tuần",
    month: "Tháng",
    quy: "Quý",
    year: "Năm"
  };

  statusFilters = [
    { label: 'Tất cả', value: null },
    { label: 'Đã duyệt', value: 'approved' },
    { label: 'Phê duyệt thay đổi', value: 'pending' },

  ];

  uploadedFiles: string[] = [
    'TEMPLATE_P1+2.xlsx',
    'TEMPLATE_P1+2TL.xlsx'
  ];

    // Bộ lọc
    selectedUser: string | null = null;
    selectedFrequency: string | null = null;
    selectedStatus: string | null = null;
    searchText: string = '';

    isDropdownOpen = false;
    isStatusDropdownOpen = false;
    isFrequencyDropdownOpen = false;

  tasks = [
    {
      name: "CÁC CÔNG VIỆC LIÊN QUAN ĐẾN LƯƠNG NHÂN VIÊN",
      expanded: false, // Mặc định đóng
      assignee: "Vui Đinh Thị Thúy",
      department: "Nhân Sự",
      deadline: "31/12/2025",
      status: "Đã duyệt",
      frequency: "Tháng",
      category: "NSU - LƯƠNG",
      subTasks: [
        { name: "TÍNH LƯƠNG NHÂN VIÊN ILEARN",
        assignee: "Vui Đinh Thị Thúy",
        department: "Nhân Sự",
        deadline: "31/12/2025",
        status: "Đã duyệt",
        frequency: "Tháng",
        category: "NSU - LƯƠNG", },
        { name: "TÍNH LƯƠNG GIA SƯ",
        assignee: "Vân Võ Thị Thanh",
        department: "Nhân Sự",
        deadline: "31/12/2025",
        status: "Đã duyệt",
        frequency: "Tháng",
        category: "NSU - LƯƠNG", },
        { name: "TÍNH LƯƠNG NHÂN VIÊN TRENET",
        assignee: "Vui Đinh Thị Thúy",
        department: "Nhân Sự",
        deadline: "31/12/2025",
        status: "Đã duyệt",
        frequency: "Tháng",
        category: "NSU - LƯƠNG", },
      ],
    },
    {
      name: "Xây dựng video tuyển dụng",
      assignee: "Duyên Huỳnh Cao Kỳ",
      department: "Sale - Marketing",
      deadline: "25/03/2025",
      status: "Đã duyệt",
      frequency: "Ngày",
      category: "SALE MARKETING"
    },
    {
      name: "HIỆU CHỈNH Tài liệu - Q1 (2025-2026)",
      assignee: "Loan Nguyễn Thị Mỹ",
      department: "Bộ phận Tiểu Học",
      deadline: "08/06/2025",
      status: "Đã duyệt",
      frequency: "Năm",
      category: "02.GVN - HIỆU CHỈNH"
    },
    {
      name: "PHÁP LÝ CÔNG TY",
      assignee: "Ái Phạm Xuân",
      department: "Bộ phận Lý",
      deadline: "15/06/2023",
      status: "Đã duyệt",
      frequency: "Năm",
      category: "PHÁP LÝ"
    },
    {
      name: "KẾ TOÁN THỦ QUỸ",
      assignee: "Thanh Ngô Thị Ngọc",
      department: "Kế toán",
      deadline: "31/12/2025",
      status: "Đã duyệt",
      frequency: "Tháng",
      category: "KTO - THỦ QUỸ"
    },
    {
      name: "Lên ý tưởng trang trí giáng sinh và Tết Âm Lịch",
      assignee: "Duyên Huỳnh Cao Kỳ",
      department: "Sale - Marketing",
      deadline: "30/09/2024",
      status: "Phê duyệt thay đổi",
      frequency: "Tháng",
      category: "SALE MARKETING"
    },
    {
      name: "Tổng hợp thông tin YDA",
      assignee: "Phương Trần Thị Lan",
      department: "Ban Chuyên Đề Toán Tiểu Học",
      deadline: "31/05/2025",
      status: "Đã duyệt",
      frequency: "Tháng",
      category: "CHU - BÁO CÁO-WLY"
    }
  ];

  filteredTasks() {
    return this.tasks.filter(task => {
      const searchText = this.searchText?.toLowerCase() || '';
      const selectedUser = this.selectedUser || null;
      const selectedStatus = this.selectedStatus;
      const selectedFrequency = this.selectedFrequency;
  
      // Tìm kiếm từ khóa trong tên công việc, người xử lý, hoặc danh mục
      const matchText = 
        task.name?.toLowerCase().includes(searchText) || 
        task.assignee?.toLowerCase().includes(searchText) || 
        task.category?.toLowerCase().includes(searchText);
  
      // Kiểm tra người xử lý
      const matchUser = selectedUser ? task.assignee === selectedUser : true;
  
      // Kiểm tra trạng thái (nếu là null hoặc "Tất cả", thì hiển thị tất cả)
      const matchStatus = selectedStatus === null || task.status === selectedStatus;

      // Kiểm tra loại định kỳ
      const matchFrequency = selectedFrequency === null || task.frequency === selectedFrequency;
    

      
      return matchText && matchUser && matchStatus && matchFrequency;
    });
  }
  

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

    // Mở/đóng dropdown trạng thái
    toggleStatusDropdown() {
      this.closeAllDropdowns();
      this.isStatusDropdownOpen = !this.isStatusDropdownOpen;
    }
  
    // Mở/đóng dropdown loại định kỳ
    toggleFrequencyDropdown() {
      this.closeAllDropdowns();
      this.isFrequencyDropdownOpen = !this.isFrequencyDropdownOpen;
    }
  
    // Đóng tất cả dropdown
    closeAllDropdowns() {
      this.isStatusDropdownOpen = false;
      this.isFrequencyDropdownOpen = false;
    }
  
    // Chọn trạng thái
    selectStatus(status: string) {
      this.selectedStatus = status === 'Tất cả' ? null : status;
      this.isStatusDropdownOpen = false; // Đóng dropdown sau khi chọn
    }
  
    // Chọn loại định kỳ
    selectFrequency(frequency: string ) {
      this.selectedFrequency = frequency === 'Tất cả' ? null : frequency;
      // this.selectedFrequency = frequency;
      this.isFrequencyDropdownOpen = false; // Đóng dropdown sau khi chọn
    }

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

  openUploadTemplate(){
    this.ref = this.dialogService.open(UploadTemplateComponent, {
      header: 'Upload Template File',
      width: '30vw',
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
    this.ref.onClose.subscribe((file) => {
      if (file) {
        console.log('File is selected', file);
      }
    });
  }
  openDate(){
    this.ref = this.dialogService.open(FilterGroupDateComponent, {
      header: 'Lọc theo thời gian',
      width: '30vw',
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
    this.ref.onClose.subscribe((data) => {
      if (data) {
        console.log('File is selected', data);
      }
    });
  }

  

}

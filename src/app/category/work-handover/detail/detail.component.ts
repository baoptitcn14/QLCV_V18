import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { UserSelectComponent } from '../../../shared/components/user-select/user-select.component';
import { ExtendedSSOOrganizationDto, OrgSelectEvent, UserOrgSelectComponent, UserOrgSelectEvent } from '../../../shared/components/user-org-select/user-org-select.component';
import { MFilesComponent } from '../../../dynamic-form/m-files/m-files.component';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

interface CongViec {
  ten: string;
  nguoiXuLy: string;
  nguoiDuyet: string;
  nguoiGiamSat: string;
  boPhanTiepNhan: string;
}

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputIconModule,
    InputTextareaModule,
    InputTextModule,
    IconFieldModule,
    MFilesComponent,
    UserSelectComponent,
    UserOrgSelectComponent,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  listOrg: ExtendedSSOOrganizationDto[] = [];

  form!: FormGroup;

  // Dữ liệu công việc xử lý và định kỳ
  allXuLyJobs = [
    { title: 'Xử lý văn bản A' },
    { title: 'Xử lý sự cố mạng' },
  ];
  allDinhKyJobs = [
    { title: 'Backup dữ liệu hàng tuần' },
    { title: 'Kiểm tra hệ thống định kỳ' },
  ];

  xuLyJobs = [...this.allXuLyJobs];
  dinhKyJobs = [...this.allDinhKyJobs];

  // Biến tìm kiếm
  searchXuLy: string = '';
  searchDinhKy: string = '';

  // Dữ liệu mẫu (có thể thay thế bằng FormArray hoặc data từ API)
  public viecDaTao: CongViec[] = [];

  public viecDinhKy: CongViec[] = [];

  // Toggle ẩn/hiện
  showXuLy: boolean = true;
  showDinhKy: boolean = true;
  showViecs: boolean = true;
  showViecDinhKy: boolean = true;

  constructor(
    private dialogService: DialogService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nguoiBanGiao: this.fb.array([]),
      banGiao: [null],
      nguoiDuyet: [null],
      boPhanTiepNhan: [null],
      title: ['', Validators.required],
      content: ['']
    });
  }

  onClose() {
    this.router.navigate(['/category-workhandover']);
  }

  onAddRowNguoiBanGiao(event: UserOrgSelectEvent) {
    // Xử lý thêm người bàn giao (nếu cần)
  }

  onSelectOrgEvent(event: OrgSelectEvent) {
    event.listUserInfo.forEach((userInfo) => {
      this.onAddRowNguoiBanGiao({
        state: event.state,
        userInfo: userInfo,
      });
    });
  }

  onUserSelect(event: UserOrgSelectEvent, formControlName: string) {
    if (event.state) {
      this.form.get(formControlName)?.setValue(event.userInfo);
    } else {
      this.form.get(formControlName)?.setValue(null);
    }
  }

  get banGiao() {
    return this.form!.get('banGiao')!.value;
  }
  get nguoiDuyet() {
    return this.form.get('nguoiDuyet')!.value;
  }
  get boPhanTiepNhan() {
    return this.form.get('boPhanTiepNhan')!.value;
  }

  // Lọc công việc xử lý
  filterXuLyJobs() {
    const keyword = this.searchXuLy.toLowerCase();
    this.xuLyJobs = this.allXuLyJobs.filter(job => job.title.toLowerCase().includes(keyword));
  }

  // Lọc công việc định kỳ
  filterDinhKyJobs() {
    const keyword = this.searchDinhKy.toLowerCase();
    this.dinhKyJobs = this.allDinhKyJobs.filter(job => job.title.toLowerCase().includes(keyword));
  }

  // Làm mới
  refreshXuLy() {
    this.searchXuLy = '';
    this.xuLyJobs = [...this.allXuLyJobs];
  }
  refreshDinhKy() {
    this.searchDinhKy = '';
    this.dinhKyJobs = [...this.allDinhKyJobs];
  }

  // Toggle logic
  toggleXuLy() {
    this.showXuLy = !this.showXuLy;
  }
  toggleDinhKy() {
    this.showDinhKy = !this.showDinhKy;
  }
  toggleViecs() {
    this.showViecs = !this.showViecs;
  }
  toggleViecDinhKy() {
    this.showViecDinhKy = !this.showViecDinhKy;
  }

  // Xóa
  xoaViec(index: number) {
    this.viecDaTao.splice(index, 1);
  }
  xoaViecDinhKy(index: number) {
    this.viecDinhKy.splice(index, 1);
  }
}

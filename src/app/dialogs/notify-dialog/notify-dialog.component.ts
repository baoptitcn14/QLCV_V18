import { 
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogFooterComponent } from '../../shared/dialog-partials/dialog-footer/dialog-footer.component';
import { DialogFooterDirective } from '../../shared/directives/dialog-footer.directive';
import { DialogHeaderDirective } from '../../shared/directives/dialog-header.directive';
import { CalendarModule } from 'primeng/calendar';
import { LongToDayPipe } from '../../shared/pipes/long_to_date.pipe';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { MFilesComponent } from '../../dynamic-form/m-files/m-files.component';
import {
  ExtendedSSOOrganizationDto,
  OrgSelectEvent,
  UserOrgSelectComponent,
  UserOrgSelectEvent,
} from '../../shared/components/user-org-select/user-org-select.component';
import { UserSelectComponent } from '../../shared/components/user-select/user-select.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';



@Component({
  selector: 'app-notify-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogFooterDirective,
    DialogHeaderDirective,
    DialogFooterComponent,
    InputIconModule,
    InputTextareaModule,
    InputTextModule,
    CalendarModule,
    LongToDayPipe,
    DropdownModule,
    IconFieldModule,
    MFilesComponent,
    UserSelectComponent,
    UserOrgSelectComponent,
    TabViewModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    OverlayPanelModule,
    TableModule
  ],
  templateUrl: './notify-dialog.component.html',
  styleUrl: './notify-dialog.component.scss'
})
export class NotifyDialogComponent implements OnInit{
  @Input({ required: true }) visible = true;
  @Output() onHideEvent = new EventEmitter();

  controlOpenUserSelect = {
    nguoiDuyet: false,
  };


  title = 'Thêm thông báo mới';

  dateStart: Date | undefined;

  dateEnd: Date | undefined;

  listStatus =[
    {
      code:'TDD',
      label:'Tự động duyệt'
    },
    {
      code:'DMD',
      label:'Duyệt mặc định'
    },
  ]


  listNotificationType =[
    {
      code:'SPP',
      label:'Soạn PP'
    },
    {
      code:'STL',
      label:'Soạn tài liệu'
    },
    {
      code:'TBDK',
      label:'Thông báo định kỳ'
    },
    {
      code:'TBMD',
      label:'Thông báo mặc định'
    },
  ]
  listPriority =[
    {
      code:'T',
      label:'Thấp'
    },
    {
      code:'TB',
      label:'Trung bình'
    },
    {
      code:'C',
      label:'Cao'
    },
  ]
  listOrg: ExtendedSSOOrganizationDto[] = [];

  showTabView: boolean = true;

  constructor(
    private dialogService: DialogService,
    private fb: FormBuilder,
  ){}

  form!: FormGroup ;
  
  ngOnInit(): void {
    this.form = this.fb.group({
      dateStart: [null, Validators.required],
      dateEnd: [null, Validators.required],
      status: [null],
      title: ['', Validators.required],
      content: ['', Validators.required],
      duyet: [null], 
      listNguoiBoPhanDuyet: [[]],
      notificationType: [null],
      priority: [null],
      loaiDoiTuong: [[]],
      listFile: [[]],
      listDoiTuongLienQuan: this.fb.array([]),
    });
  }
  
  

  onHide() {
    this.visible = false;
    this.onHideEvent.emit();
  }

  onSave() {
    console.log('Lưu thông báo')
  }

  private initDoiTuongLienQuanControl() {
    return this.fb.group({
      fullName: '',
      loaiDoiTuong: ['THAMKHAO', Validators.required],
      noiDung: '',
      orgName: '',
      userId: '',
      orgId: '',
      emailAddress: '',
    });
  }
  
  onAddRowDoiTuongLienQuan(event: UserOrgSelectEvent) {
    const index = this.listDoiTuongLienQuan.controls.findIndex(
      (f) =>
        f.get('userId')?.value == event.userInfo.userId &&
        f.get('orgId')?.value == event.userInfo.orgId
    );

    if (event.state) {
      if (index < 0) {
        let formControl = this.initDoiTuongLienQuanControl();

        this.listDoiTuongLienQuan.controls.push(formControl);
        formControl.setValue({
          ...(event.userInfo as any),
          loaiDoiTuong: 'THAMKHAO',
          noiDung: '',
        });
      }
    } else {
      if (index > -1) this.listDoiTuongLienQuan.removeAt(index);
    }
  }

  //#region ĐỐI TƯỢNG LIÊN QUAN
  doiTuongLienQuanParam = {
    listLoaiDoiTuong: [
      {
        id: 'THAMKHAO',
        name: 'Tham khảo',
      },
      {
        id: 'THAMGIATHUCHIEN',
        name: 'Tham gia thực hiện',
      },
    ],
  };

  get listDoiTuongLienQuan(): FormArray {
    return this.form!.get('listDoiTuongLienQuan') as FormArray;
  }

  onSelectOrgEvent(event: OrgSelectEvent) {
    event.listUserInfo.forEach((userInfo) => {
      this.onAddRowDoiTuongLienQuan({
        state: event.state,
        userInfo: userInfo,
      });
    });
  }

  onDeleteDoiTuongLienQuan(index: number) {
    this.listDoiTuongLienQuan.removeAt(index);
  }

  
  onUserSelect(event: UserOrgSelectEvent, formControlName: string) {
    if (event.state) this.form!.get(formControlName)?.setValue(event.userInfo);
    else this.form!.get(formControlName)?.setValue(null);
  }
  
  get duyet() {
    return this.form!.get('duyet')!.value;
  }
  


}

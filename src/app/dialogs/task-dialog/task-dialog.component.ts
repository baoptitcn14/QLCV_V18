import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DialogFooterComponent } from '../../shared/dialog-partials/dialog-footer/dialog-footer.component';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CategoryOutputDto,
  CongViecGuidGetDto,
  CongViecLog,
  CongViecOutputDto,
  CriteriaRequestDto,
  InfoDetailUserDto,
  Qlcv_CategoryServiceProxy,
  Qlcv_CongViecServiceProxy,
  Qlcv_SearchServiceProxy,
  SearchCongViecOutputDto,
  ShareKeyByIdDto,
  StringEntityDto,
  TieuChiDto,
} from '../../shared/service-proxies/qlcv-service-proxies';
import { AppSessionService } from '../../shared/session/app-session.service';
import {
  ExtendedSSOOrganizationDto,
  UserOrgSelectComponent,
  UserOrgSelectEvent,
} from '../../shared/components/user-org-select/user-org-select.component';
import {
  SSO_SSOServiceProxy,
  SSO_UserServiceProxy,
  UserOutputDto,
} from '../../shared/service-proxies/sso-service-proxies';
import _ from 'lodash';
import { forkJoin, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CategoryHardService } from '../../shared/services/category-hard.service';

import { TimelineModule } from 'primeng/timeline';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { LongToDayPipe } from '../../shared/pipes/long_to_date.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AppConst } from '../../shared/app-const';
import { BtnActionBusiness } from '../../shared/button-actions-const';
import { ValidatorsService } from '../../shared/services/validators.service';
import { SSOUtilitService } from '../../shared/services/sso.service';
import { FormService, InitFormModel } from '../../shared/services/form.service';
import { DateTimeService } from '../../shared/services/date-time.service';
import { UtilityService } from '../../shared/services/utility.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogService } from 'primeng/dynamicdialog';
import { TieuChiDialogComponent } from '../tieu-chi-dialog/tieu-chi-dialog.component';
import { TagModule } from 'primeng/tag';
import { UserSelectComponent } from '../../shared/components/user-select/user-select.component';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    DialogFooterComponent,
    ButtonModule,
    SplitButtonModule,
    AutoCompleteModule,
    DropdownModule,
    LongToDayPipe,
    InputTextModule,
    CalendarModule,
    InputNumberModule,
    CheckboxModule,
    InputTextareaModule,
    OverlayPanelModule,
    FieldsetModule,
    TabViewModule,
    TimelineModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    IconFieldModule,
    InputIconModule,
    TagModule,
    UserSelectComponent,
    UserOrgSelectComponent,
  ],
  providers: [CategoryHardService],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss',
})
export class TaskDialogComponent implements OnInit {
  @Input({ required: true }) visible = false;
  @Input() taskId: string | undefined;
  @Input() parentId: string | undefined;
  @Input('groupCode') groupCode: string | undefined;
  @Output() onHideEvent = new EventEmitter();

  title = 'Thêm công việc mới';
  controlOpenUserSelect = {
    nguoiXuLy: false,
    nguoiGiamSat: false,
    nguoiDuyet: false,
  };

  extendsActions: MenuItem[] = [
    {
      label: 'Cấu hình',
      icon: 'pi pi-cog',
      command: () => {},
      tooltipOptions: {
        tooltipLabel: 'Cấu hình',
      },
    },
    {
      label: 'In thông tin',
      icon: 'pi pi-print',
      command: () => {},
      tooltipOptions: {
        tooltipLabel: 'In thông tin công việc',
      },
    },
    {
      label: 'Sao chép',
      icon: 'pi pi-copy',
      command: () => {},
      tooltipOptions: {
        tooltipLabel: 'Sao chép công việc',
      },
    },
    {
      label: 'Tạm dừng',
      icon: 'pi pi-ban',
      command: () => {},
      tooltipOptions: {
        tooltipLabel: 'Tạm dừng công việc',
      },
    },
  ];
  filteredParentTasks: SearchCongViecExtends[] = [];
  listLoaiCongViec: CategoryOutputDto[] = [];
  listDonViThucHien = [
    {
      code: 'D',
      label: 'Ngày',
    },
    {
      code: 'H',
      label: 'Giờ',
    },
  ];
  listOrg: ExtendedSSOOrganizationDto[] = [];
  list: InfoDetailUserDto[] = [
    {
      emailAddress: 'tienln@ilearn.net.vn',
      userId: 232,
      name: null,
      surname: null,
      fullName: 'Tiến Lê Nhật',
      orgId: 'fdb84251-a1b2-1201-aabf-387c0f089806',
      orgName: 'ILEARN',
      action: null,
      message: null,
      creationTime: null,
      isNew: null,
      isRelate: null,
      search: null,
      status: null,
    },
  ].map((item) => InfoDetailUserDto.fromJS(item));
  listCongViecLog: CongViecLog[] = [];

  form: FormGroup | undefined;
  listControlForm: InitFormModel[] = [
    { name: 'parentId' },
    { name: 'id', validators: ['required'] },
    { name: 'title', validators: ['required'] },
    { name: 'content' },
    { name: 'status' },
    { name: 'doBaoMat' },
    { name: 'doUuTien' },
    { name: 'hanHoanThanh', validators: ['required'] },
    { name: 'thoiGianThucHien', validators: ['required'] },
    { name: 'thoiGianThucTe' },
    { name: 'tongThoiGianChiDinhViecCon' },
    { name: 'tongThoiGianThucTeViecCon' },
    { name: 'number1' },
    { name: 'number2' },
    { name: 'loaiCongViecId', validators: ['required'] },
    { name: 'giamSat' },
    { name: 'listNguoiBoPhanGiamSat' },

    { name: 'boPhanTao' },
    { name: 'xuLy', validators: ['required'] },
    { name: 'listNguoiBoPhanXuLy' },

    { name: 'duyet', validators: ['required'] },
    { name: 'listNguoiBoPhanDuyet' },

    { name: 'listDoiTuongLienQuan' },
    { name: 'listCongViecLienQuan' },
    { name: 'listTieuChi' },
    { name: 'listXepLoai' },

    { name: 'listFile' },
    { name: 'tags' },

    { name: 'listPermission' },
    { name: 'creationTime' },
    { name: 'quyTrinhCode' },

    { name: 'value2' },
    { name: 'value3' }, // flag VIECBAOCAO
    { name: 'value9' },
    { name: 'value10' },

    { name: 'listValueChild' },

    { name: 'listDuyet' },

    // nếu DataReference có giá trị thì đây là 1 công việc định kỳ đươc tạo tự động từ 1 cv mẫu A
    // DataReference = A.id
    { name: 'dataReference' },
  ];
  document: Document | undefined;

  isLoading = true;

  constructor(
    private qlcv_SearchServiceProxy: Qlcv_SearchServiceProxy,
    private session: AppSessionService,
    private qlcv_CategroyService: Qlcv_CategoryServiceProxy,
    private sso_SSOServiceProxy: SSO_SSOServiceProxy,
    private sso_UserServiceProxy: SSO_UserServiceProxy,
    private qlcv_CongViecServiceProxy: Qlcv_CongViecServiceProxy,
    private categoryHardService: CategoryHardService,
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private sso_UtilitService: SSOUtilitService,
    private formService: FormService,
    private dateTimeService: DateTimeService,
    private utService: UtilityService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.form = this.initForm();

    this.getListLoaiCongViec();
    this.getListOrg();

    if (this.taskId) {
      this.getListLog();

      forkJoin([
        this.getListLoaiCongViec(),
        this.getListOrg(),
        this.getTaskById(),
      ]).subscribe((listRes) => {
        this.listLoaiCongViec = listRes[0];
        this.listOrg = _.orderBy(
          listRes[1] as ExtendedSSOOrganizationDto[],
          ['code', 'name'],
          ['asc', 'asc']
        );
        this.setupData(listRes[2]);
      });
    } else {
      forkJoin([this.getListLoaiCongViec(), this.getListOrg()]).subscribe(
        (listRes) => {
          this.listLoaiCongViec = listRes[0];
          this.listOrg = _.orderBy(
            listRes[1] as ExtendedSSOOrganizationDto[],
            ['code', 'name'],
            ['asc', 'asc']
          );
          this.setupData({});
        }
      );
    }
  }

  /**
   * Filters the parent tasks based on the user's input in the autocomplete field.
   * @param event - The AutoCompleteCompleteEvent containing the user's query.
   */
  filterParentTasks(event: AutoCompleteCompleteEvent) {
    let text = event.query;

    // If the query text is empty, clear the filteredParentTasks list and return
    if (!text || text == '') {
      this.filteredParentTasks = [];
      return;
    }

    // Create an input object for the search service with the query text and sharedKey
    const input = new StringEntityDto({
      id: JSON.stringify({
        title: text,
        congViecId: null,
        shareKey: this.session.sharedKey
          ? JSON.stringify(this.session.sharedKey)
          : null,
      }),
    });

    // Call the search service to get the filtered list of parent tasks
    return this.qlcv_SearchServiceProxy
      .searchCongViecParent(input)
      .subscribe((res: SearchCongViecOutputDto[]) => {
        this.filteredParentTasks = res.map(
          (item: SearchCongViecOutputDto) =>
            ({
              ...item,
              _title:
                item.title +
                ' ( HHT: ' +
                this.dateTimeService
                  .convertLongToDate(item.hanHoanThanh!)
                  .toLocaleDateString('vi') +
                ')',
            } as SearchCongViecExtends)
        );
      });
  }

  onUserSelect(event: UserOrgSelectEvent, formControlName: string) {
    if (event.state) this.form!.get(formControlName)?.setValue(event.userInfo);
    else this.form!.get(formControlName)?.setValue(null);
  }

  get duyet() {
    return this.form!.get('duyet')!.value;
  }

  get xuLy() {
    return this.form!.get('xuLy')!.value;
  }

  get giamSat() {
    return this.form!.get('giamSat')!.value;
  }

  onTabChange(event: number) {
    if (event == 1) {
      if (this.taskId && this.form) {
        if (
          this.form.value.value10 == 'CREATETODO' ||
          this.form.value.value10 == 'UPDATECREATETODO'
        ) {
          this.setupData({
            items: this.form.get('listValueChild')?.value,
          });
        } else {
          this.getListCongViecCon();
        }
      }
    }
  }

  //#region TIÊU CHÍ
  get listTieuChi() {
    return this.form!.get('listTieuChi')!.value;
  }

  onCreateTieuChi() {
    const dialogRef = this.dialogService.open(TieuChiDialogComponent, {
      header: 'Tạo tiêu chí',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      closeOnEscape: false,
      styleClass: 'p-dialog-custom',
      maximizable: true,
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.form?.get('listTieuChi')?.patchValue([...this.listTieuChi, res]);
        console.log(this.form);
      }
    });
  }

  onEditTieuChi(tieuChi: TieuChiDto, index: number) {
    const dialogRef = this.dialogService.open(TieuChiDialogComponent, {
      header: 'Chỉnh sửa tiêu chí',
      width: '50%',
      closeOnEscape: false,
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      styleClass: 'p-dialog-custom',
      maximizable: true,
      data: {
        tieuChi: tieuChi,
      },
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        // this.form?.get('listTieuChi')?.patchValue([...this.listTieuChi, res]);
        this.listTieuChi.splice(index, 1, res);
        console.log(this.form);
      }
    });
  }

  //#endregion

  //#region CÔNG VIỆC CON

  congViecConParam = {
    minDate: new Date(),
    valueSearch: '',
    page: {
      skipCount: 0,
      maxResultCount: 20,
      totalCount: 2,
    },
    configForm: [
      { name: 'id' },
      { name: 'title', validators: ['required'] },
      { name: 'hanHoanThanh', validators: ['required'] },
      { name: 'duyet' },
      { name: 'listNguoiBoPhanDuyet' },
      { name: 'xuLy' },
      { name: 'listNguoiBoPhanXuLy' },
      { name: 'thoiGianThucHien', validators: ['required'] },
      { name: 'status' },
    ],
  };

  get listCongViecCon() {
    return this.form!.get('listChildren') as FormArray;
  }

  onCreateTask() {
    if (!this.taskId) {
      this.onAddTaskChild();
    }
  }

  onAddTaskChild() {
    if (this.taskId) return;

    var congViecConLast = _.last(this.listCongViecCon.controls) as FormGroup;

    if (congViecConLast) {
      if (congViecConLast.value.title == '' || !congViecConLast.value.title) {
        return;
      }
      congViecConLast.get('title')!.setValidators(Validators.required);

      congViecConLast
        .get('hanHoanThanh')!
        .setValidators(
          this.dateTimeService.compareTwoDate2(
            this.form!.get('hanHoanThanh') as FormControl
          )
        );
    }

    this.initFormTaskChild();

    this.formService.realoadListValidationControl(
      this.form!.get('listChildren') as FormArray,
      'hanHoanThanh'
    );
  }

  onDeleteTaskChild(index: number) {
    this.listCongViecCon.removeAt(index);
  }

  changeValue(key: string, index: number, event: any) {
    var valueOld = this.listCongViecCon.controls[index].get(key)!.value;
    if (event.target.value != valueOld)
      this.listCongViecCon.controls[index]
        .get(key)!
        .setValue(event.target.value);
  }

  private initFormTaskChild() {
    var nguoiBoPhan = this.sso_UtilitService.setInfoDefaulUserOfOrg(
      this.listOrg,
      this.session.userId!
    );

    var formControl = this.formService.initForm(
      this.congViecConParam.configForm,
      {
        id: AppConst.idZero,
        hanHoanThanh: new Date(),
        thoiGianThucHien: 1,
        xuLy: nguoiBoPhan,
        listNguoiBoPhanXuLy: _.cloneDeep(this.listOrg),
        duyet: _.cloneDeep(nguoiBoPhan),
        listNguoiBoPhanDuyet: this.sso_UtilitService.getListNguoiBoPhanDuyet(
          this.listOrg,
          nguoiBoPhan?.orgId!,
          nguoiBoPhan?.userId!
        ),
      }
    );

    (this.form!.get('listChildren') as FormArray).push(formControl);

    let lastFormControl = _.last(this.listCongViecCon.controls) as FormGroup;

    lastFormControl.get('xuLy')!.valueChanges.subscribe((res) => {
      setTimeout(() => {
        this.sso_UtilitService.setNguoiBoPhanDuyet(
          lastFormControl,
          this.listOrg
        );
      }, 100);
    });
  }

  private getListCongViecCon() {
    /**
     * Get list công việc con
     * @returns void
     */
    if (this.taskId) {
      const input = new CongViecGuidGetDto();
      input.criterias = [
        new CriteriaRequestDto({
          propertyName: 'parentId',
          operation: 0,
          value: this.taskId,
        }),
        new CriteriaRequestDto({
          propertyName: 'value1',
          operation: 1,
          value: 'Replace',
        }),
      ];

      if (this.congViecConParam.valueSearch) {
        input.criterias.push(
          new CriteriaRequestDto({
            propertyName: 'title',
            operation: 6,
            value: this.congViecConParam.valueSearch.trim(),
          })
        );
      }

      input.maxResultCount = this.congViecConParam.page.maxResultCount;
      input.skipCount = this.congViecConParam.page.skipCount;
      input.sorting = 'hanHoanThanh ASC';

      this.qlcv_CongViecServiceProxy.getAll(input).subscribe((res) => {
        this.congViecConParam.page.totalCount = res.totalCount!;
        this.congViecConParam.page.skipCount +=
          this.congViecConParam.page.maxResultCount;
        this.setupDataCongViecCon(res.items!);
      });
    }
  }

  private setupDataCongViecCon(data: CongViecOutputExtend[]) {
    _.each(data, (congViecCon) => {
      const status = this.categoryHardService.listStatusBusiness.find(
        (f) => f.id == congViecCon.status?.toUpperCase()
      );

      const formCongViecCon = this.formService.initForm(
        this.congViecConParam.configForm,
        {
          ...congViecCon,
          status: status,
        }
      );
      (this.form!.get('listChildren') as FormArray).push(formCongViecCon);
    });
  }
  //#endregion

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

  get listDoiTuongLienQuan() {
    return this.form!.get('listDoiTuongLienQuan') as FormArray;
  }

  onAddRowDoiTuongLienQuan(event: UserOrgSelectEvent) {
    if (event.state) {
      let formControl = this.initDoiTuongLienQuanControl();

      this.listDoiTuongLienQuan.controls.push(formControl);
      formControl.setValue({
        ...(event.userInfo as any),
        loaiDoiTuong: 'THAMKHAO',
        noiDung: '',
      });
    } else {
      const index = this.listDoiTuongLienQuan.controls.findIndex(
        (f) => f.get('userId')?.value == event.userInfo.userId
      );

      if (index > -1) this.listDoiTuongLienQuan.removeAt(index);
    }
  }

  onDeleteDoiTuongLienQuan(index: number) {
    this.listDoiTuongLienQuan.removeAt(index);
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

  //#endregion

  //#region SETUP DATA
  private setupData(data: any) {
    if (!this.taskId) {
      // xu ly + dinh ky
      var nguoiBoPhan = this.sso_UtilitService.setInfoDefaulUserOfOrg(
        this.listOrg,
        this.session.userId!
      );

      this.form?.patchValue({
        xuLy: _.cloneDeep(nguoiBoPhan),
        listNguoiBoPhanXuLy: _.cloneDeep(this.listOrg),
        listNguoiBoPhanGiamSat: _.cloneDeep(this.listOrg),
      });

      // duyet
      this.sso_UtilitService.setNguoiBoPhanDuyet(this.form!, this.listOrg);
    } else {
      this.utService.convertUndefinedToNull(data.duyet);
      this.utService.convertUndefinedToNull(data.xuLy);
      this.utService.convertUndefinedToNull(data.giamSat);
      if (this.form) {
        this.formService.setupDataForm(this.form!, this.listControlForm, data);

        this.form.patchValue({
          ...data,
          hanHoanThanh: this.dateTimeService.convertLongToDate(
            data.hanHoanThanh
          ),
          listNguoiBoPhanXuLy: _.cloneDeep(this.listOrg),
          listNguoiBoPhanGiamSat: _.cloneDeep(this.listOrg),
          listNguoiBoPhanDuyet: this.sso_UtilitService.getListNguoiBoPhanDuyet(
            _.cloneDeep(this.listOrg),
            data.xuLy.orgId,
            data.xuLy.userId
          ),
          listDoiTuongLienQuan: data.listDoiTuongLienQuan || [],
          listTieuChi: data.listTieuChi || [],
          listValueChild: data.listChildren,
        });

        if (data.value6) {
          this.document = JSON.parse(data.value6) as any;

          if (this.document) {
            this.utService.convertUndefinedToNull(this.document.duyet);
            this.utService.convertUndefinedToNull(this.document.xuLy);
            this.utService.convertUndefinedToNull(this.document.giamSat);
            this.document.hanHoanThanh = this.dateTimeService.convertLongToDate(
              data.hanHoanThanh
            );
            // try {
            //   this.utService.convertUndefinedToNull(
            //     this.document.congViecDinhKy.xuLyDinhKy
            //   );
            //   this.document.congViecDinhKy.stopFrom = this.document
            //     .congViecDinhKy.stopFrom
            //     ? this.dateTimeService.convertLongToDate(
            //         this.document.congViecDinhKy.stopFrom
            //       )
            //     : undefined;
            //   this.document.congViecDinhKy.stopTo = this.document.congViecDinhKy
            //     .stopTo
            //     ? this.dateTimeService.convertLongToDate(
            //         this.document.congViecDinhKy.stopTo
            //       )
            //     : undefined;
            // } catch {
            //   this.document.congViecDinhKy = _.cloneDeep(
            //     this.form!.value.congViecDinhKy
            //   );
            // }
          }
        }
      }
    }
    this.isLoading = false;
  }
  // #endregion

  //#region INIT FORM
  private initForm() {
    let form = this.fb.group({
      parentId: this.parentId,
      id: AppConst.idZero,
      doBaoMat: 1,
      doUuTien: 1,
      hanHoanThanh: [new Date(), [Validators.required]],
      thoiGianThucHien: 1,
      number1: 0,
      number2: 0,
      nguoiXuLyId: [this.session.userId!, Validators.required],
      nguoiDuyetId: [this.session.userId!, Validators.required],
      listFile: [],
      tags: '[]',
      content: '',
      value2: ['D', Validators.required],
      value3: this.groupCode,
      listTieuChi: [],
      listPermission: [BtnActionBusiness.LUU],
      title: ['', Validators.required],
      tongThoiGianChiDinhViecCon: 0,
      loaiCongViecId: ['', Validators.required],
      creationTime: new Date(),
      time: new FormControl('01:23'),
      dataReference: '',
      parent: this.fb.group({
        id: [],
        title: [''],
        hanHoanThanh: [],
        xuLy: [],
      }),
      congViecDinhKy: this.fb.group({
        isActive: [false],
        loaiDinhKy: [null],
        value: ['[]'],
        executeDate: null,
        stopFrom: [],
        stopTo: [],
        xuLyDinhKy: null,
        listNguoiBoPhanXuLyDinhKy: [],
      }),
      listChildren: this.fb.array([]),
      xuLy: [null, Validators.required],
      duyet: [null, Validators.required],
      giamSat: null,
      listNguoiBoPhanXuLy: [],
      listNguoiBoPhanGiamSat: [],
      listCongViecLienQuan: [],
      listDoiTuongLienQuan: this.fb.array([]),
      listNguoiBoPhanDuyet: [],
    });

    form
      .get('hanHoanThanh')!
      .setValidators(
        this.validatorService.compareTwoDate2(
          form!.get('parent')!.get('hanHoanThanh') as FormControl
        )
      );

    return form;
  }
  //#endregion

  //#region PRIVATE METHOD
  private getTaskById() {
    const input = new ShareKeyByIdDto();
    input.id = this.taskId;
    input.shareKey = this.session.sharedKey;

    return this.qlcv_CongViecServiceProxy.getById(input);
  }

  /**
   * Get list of task categories.
   *
   * Get list of task categories. Options will be:
   * - sorting: 'code asc'
   * - criterias:
   *   + groupCode: TASK
   *   + status: ACTIVE
   *
   * @returns {Observable<CategoryHardOutputDto[]>} the list of task categories
   */
  private getListLoaiCongViec() {
    var option = {
      sorting: 'code asc',
      criterias: [
        {
          propertyName: 'groupCode',
          operation: 0,
          value: 'TASK',
        },
        {
          propertyName: 'status',
          operation: 0,
          value: 'ACTIVE',
        },
      ],
    };

    return this.qlcv_CategroyService.getList(option as any);
  }

  /**
   * Lay danh sach toan bo don vi
   * @returns danh sach don vi
   */
  private getListOrg() {
    return this.sso_SSOServiceProxy.getAll();
  }

  /**
   * Lay danh sach log cua cong viec
   * @returns
   */
  private getListLog() {
    let congViecLogs: CongViecLogExtend[] = [];

    return this.qlcv_CongViecServiceProxy
      .getCongViecLog({
        id: this.taskId,
      } as any)
      .pipe(
        switchMap((logs: CongViecLogExtend[]) => {
          congViecLogs = logs;
          return this.sso_UserServiceProxy.getByListUserId(
            logs.map((m) => m.userId!)
          );
        })
      )
      .subscribe((listUser: UserOutputDto[]) => {
        congViecLogs.forEach((log) => {
          const user = listUser.find((m) => m.id == log.userId!);

          if (user) {
            log.fullName = user.fullName;
          }

          log.actionDisplay = this.categoryHardService.listStatusBusiness.find(
            (f) => f.id == log.action
          );
        });

        this.listCongViecLog = congViecLogs;
      });
  }

  //#endregion

  onHide() {
    this.visible = false;
    this.onHideEvent.emit();
  }

  onSave() {}
}

interface CongViecLogExtend extends CongViecLog {
  fullName?: string;
  actionDisplay?: any;
}

interface Document {
  duyet: any;
  congViecDinhKy: any;
  xuLy: any;
  giamSat: any;
  hanHoanThanh: any;
}

interface SearchCongViecExtends extends SearchCongViecOutputDto {
  _title?: string;
}

interface CongViecOutputExtend extends CongViecOutputDto {
  _statusBusiness?: any;
}

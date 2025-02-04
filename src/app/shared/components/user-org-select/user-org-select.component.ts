import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import {
  SSO_SSOServiceProxy,
  SSOOrganizationDto,
  SSOTypeUserDto,
} from '../../service-proxies/sso-service-proxies';
import { FormsModule } from '@angular/forms';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { firstValueFrom } from 'rxjs';
import _ from 'lodash';
import { SearchOrgUserPipe } from '../../pipes/search-org-user.pipe';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageService } from 'primeng/api';
import { InfoDetailUserDto } from '../../service-proxies/qlcv-service-proxies';

@Component({
  selector: 'app-user-org-select',
  standalone: true,
  imports: [
    RadioButtonModule,
    CommonModule,
    CheckboxModule,
    DropdownModule,
    FormsModule,
    InputIconModule,
    InputTextModule,
    SearchOrgUserPipe,
    ButtonModule,
    SkeletonModule,
  ],
  templateUrl: './user-org-select.component.html',
  styleUrl: './user-org-select.component.scss',
})
export class UserOrgSelectComponent implements OnChanges, OnInit {
  readonly listSortOption = [
    {
      label: 'Theo bộ phận',
      icon: 'pi pi-sitemap',
      items: [
        {
          label: 'BP A đến Z',
          value: 'org-asc',
          icon: 'pi pi-sort-alpha-down',
        },
        { label: 'BP Z đến A', value: 'org-desc', icon: 'pi pi-sort-alpha-up' },
      ],
    },
    {
      label: 'Theo nhân viên',
      icon: 'pi pi-user',
      items: [
        {
          label: 'NV A đến Z',
          value: 'user-asc',
          icon: 'pi pi-sort-alpha-down',
        },
        {
          label: 'NV Z đến A',
          value: 'user-desc',
          icon: 'pi pi-sort-alpha-up',
        },
      ],
    },
  ];

  readonly listFilterOption = [
    { label: 'Của tôi', value: 'ME' },
    { label: 'Tất cả', value: 'ALL' },
  ];

  dataFilter: DataFilter = {
    filterOption: 'ALL',
    sortOption: 'org-asc',
    search: '',
  };

  isLoading = true;

  config = {
    showIconClose: false,
    showOnlyMeOption: false,
    basicStyle: true,
    showButtonFilter: false,
  };

  cloneListOrg: ExtendedSSOOrganizationDto[] = [];

  @Input({ required: true }) isOpen = false;
  @Input({ required: true }) listUserSelected: InfoDetailUserDto[] = [];
  /*
    SIGNLE: chỉ được chọn 1 user
    MUL_LOCAL: được chọn nhiều user, user A trong org B khác user A trong org C
    MUL_GLOBAL: được chọn nhiều user, user A ( org B ) == user A ( org C )
  */
  @Input() selectMode: 'SINGLE' | 'MUL_LOCAL' | 'MUL_GLOBAL' = 'MUL_GLOBAL';
  @Input() listOrg: ExtendedSSOOrganizationDto[] = [];
  @Input() usedFor: 'DASHBOARD_VIEW' | 'TASK_VIEW' = 'TASK_VIEW';
  @Input() isGetNewListOrg = true;

  @Output() onUserSelectEvent = new EventEmitter<UserOrgSelectEvent>();
  @Output() onSaveEvent = new EventEmitter<UserSelect[]>();
  @Output() onCloseEvent = new EventEmitter<any>();

  constructor(
    private sso_SSOServiceProxy: SSO_SSOServiceProxy,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.initConfig();

    if (this.isGetNewListOrg) {
      this.getListOrg()
        .then(() => {
          this.initData();
        })
        .finally(() => (this.isLoading = false));
    } else {
      this.initData();
      this.isLoading = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listOrg']) {
      this.initData();
    }

    if (changes['usedFor']) this.initConfig();

    if (changes['listUserSelected']) this.initData();
  }

  //#region INIT CONFIG
  private initConfig() {
    if (this.usedFor === 'DASHBOARD_VIEW') {
      this.config = {
        showIconClose: true,
        showOnlyMeOption: true,
        basicStyle: false,
        showButtonFilter: true,
      };
    }

    if (this.usedFor === 'TASK_VIEW') {
      this.config = {
        showIconClose: false,
        showOnlyMeOption: false,
        basicStyle: true,
        showButtonFilter: false,
      };
    }
  }
  //#endregion

  //#region ON TOGGLE ORG
  toggleOrg(org: ExtendedSSOOrganizationDto) {
    org._isToggled = !org._isToggled;

    const filteredListOrg = this.cloneListOrg.filter((item) =>
      _.startsWith(item.code, org.code + '.')
    );

    filteredListOrg.forEach((item) => {
      item._isToggled = org._isToggled;
    });
  }
  //#endregion

  //#region ON ORG SELECT
  /**
   * Toggles the selection state of an organization and its users, while preventing event propagation.
   *
   * @param org - The organization to be selected or deselected.
   * @param event - The DOM event triggered on organization selection.
   */
  onSelectOrg(org: ExtendedSSOOrganizationDto, event: any) {
    // Prevent the click event from propagating to parent elements.
    event.stopPropagation();

    if (this.selectMode == 'SINGLE')
      return this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Chỉ được chọn một nhân viên',
      });

    // Toggle the organization's selected state.
    org._isSelected = !org._isSelected;

    org.listUser!.forEach((item) => {
      item._isSelected = org._isSelected;
    });

    org._totalUserSelected = org._isSelected ? org._totalUser : 0;

    const listOrgChild = this.cloneListOrg.filter((item) =>
      _.startsWith(item.code, org.code + '.')
    );

    listOrgChild.forEach((item) => {
      item._isSelected = org._isSelected;
      item.listUser!.forEach((user) => {
        user._isSelected = org._isSelected;
      });
      item._totalUserSelected = item._isSelected ? item._totalUser : 0;
    });
  }
  //#endregion

  //#region ON USER SELECT
  /**
   * Toggles the selection state of a user, updating the parent organization's state accordingly.
   *
   * @param user - The user to be selected or deselected.
   * @param org - The organization that the user belongs to.
   */
  onSelectUser(user: ExtendedSSOTypeUserDto, org: ExtendedSSOOrganizationDto) {
    const isSelected = !user._isSelected;

    if (this.selectMode === 'MUL_LOCAL') {
      user._isSelected = !user._isSelected;

      org._totalUserSelected = org.listUser!.filter(
        (item) => item._isSelected
      ).length;

      org._isSelected =
        org._totalUserSelected === org._totalUser && org._totalUser > 0;

    } else if (this.selectMode === 'MUL_GLOBAL') {
      this.cloneListOrg.forEach((item) => {
        const u = item.listUser!.find((u) => u.key === user.key);

        if (u) {
          u._isSelected = !u._isSelected;
        }

        item._totalUserSelected = item.listUser!.filter(
          (item) => item._isSelected
        ).length;

        item._isSelected =
          item._totalUserSelected === item._totalUser && item._totalUser > 0;
      });
    } else if (this.selectMode === 'SINGLE') {
      this.cloneListOrg.forEach((item) => {
        item.listUser!.forEach((u) => {
          u._isSelected = false;
        });

        item._totalUserSelected = 0;
      });

      user._isSelected = isSelected;
      org._totalUserSelected = 1;

      if (isSelected) this.onCloseEvent.emit();
    }

    this.onUserSelectEvent.emit({
      userInfo: {
        emailAddress: user.emailAddress,
        fullName: user.name + ' ' + user.surname,
        orgName: org.name,
        userId: Number.parseInt(user.key!),
        orgId: org.organizationId,
      } as InfoDetailUserDto,
      state: isSelected,
    });
  }

  //#endregion

  //#region CLOSE

  onClose() {
    this.onCloseEvent.emit();
  }

  //#endregion

  //#region SAVE
  onFilter() {
    let listUserSelected = [] as any[];

    if (this.selectMode === 'MUL_LOCAL') {
      listUserSelected = this.cloneListOrg
        .filter((item) => item.listUser!.some((u) => u._isSelected))
        .map((item) =>
          SSOOrganizationDto.fromJS({
            ...item,
            listUser: item.listUser!.filter((u) => u._isSelected),
          })
        );
      // .flatMap((item) => item.listUser!.filter((u) => u._isSelected));
    } else if (this.selectMode === 'MUL_GLOBAL') {
      listUserSelected = this.cloneListOrg
        .filter((item) => item.listUser?.some((u) => u._isSelected))
        .flatMap((item) => item.listUser!.filter((u) => u._isSelected))
        .reduce((acc: SSOTypeUserDto[], item) => {
          if (!acc.some((u) => u.key === item.key)) acc.push(item);
          return acc;
        }, [])
        .map((item) => SSOTypeUserDto.fromJS(item));
    }

    this.onSaveEvent.emit(listUserSelected);
  }

  //#endregion

  //#region PRIVATE METHOD

  private initData() {
    this.cloneListOrg =
      this.cloneListOrg.length > 0
        ? this.cloneListOrg
        : _.cloneDeep(this.listOrg);

    this.cloneListOrg.forEach((org) => {
      if (org.listUser && this.listUserSelected.length > 0)
        org.listUser.forEach((user) => {
          user._isSelected = this.listUserSelected.some((item) => {
            if (item)
              return this.selectMode == 'MUL_GLOBAL'
                ? item.userId == user.key
                : item.userId == user.key && item.orgId == org.organizationId;
            else return false;
          });
        });

      org._isToggled = org._isToggled || false;
      org._filteredListUser = org.listUser;
      org._totalUser = org.listUser!.length || 0;
      org._totalUserSelected = org.listUser!.filter(
        (item) => item._isSelected
      ).length;
      org._isSelected =
        org._totalUserSelected === org._totalUser && org._totalUser > 0;

      org._isToggled =
        this.selectMode == 'SINGLE' && org._totalUserSelected > 0
          ? true
          : org._isToggled;
    });
  }

  private async getListOrg() {
    this.cloneListOrg = _.orderBy(
      (await firstValueFrom(
        this.sso_SSOServiceProxy.getAll()
      )) as ExtendedSSOOrganizationDto[],
      ['code', 'name'],
      ['asc', 'asc']
    );
  }

  //#endregion
}

interface DataFilter {
  filterOption: string;
  sortOption: string;
  search: string;
}

export interface UserSelect extends InfoDetailUserDto {
  _isSelected: boolean;
}

export interface ExtendedSSOOrganizationDto extends SSOOrganizationDto {
  listUser: ExtendedSSOTypeUserDto[] | undefined;
  _filteredListUser: ExtendedSSOTypeUserDto[] | undefined;
  _totalUser: number;
  _isSelected: boolean;
  _isToggled: boolean;
  _totalUserSelected: number;
}

export interface ExtendedSSOTypeUserDto extends SSOTypeUserDto {
  _isSelected: boolean;
}

export interface UserOrgSelectEvent {
  userInfo: InfoDetailUserDto;
  state: boolean;
}

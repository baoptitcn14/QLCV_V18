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
  };

  @Input({ required: true }) isOpen = false;
  @Input({ required: true }) listUserSelected: InfoDetailUserDto[] = [];
  @Input() selectMode: 'SINGLE' | 'LOCAL' | 'GLOBAL' = 'GLOBAL';
  @Input() listOrg: ExtendedSSOOrganizationDto[] = [];
  @Input() usedFor: 'DASHBOARD' | 'TASK' = 'TASK';
  @Input() isGetNewListOrg = true;

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
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listUserSelected'] || changes['listOrg']) {
      this.initData();
    }

    if (changes['usedFor']) this.initConfig();
  }

  private initConfig() {
    if (this.usedFor === 'DASHBOARD') {
      this.config = {
        showIconClose: true,
        showOnlyMeOption: true,
        basicStyle: false,
      };
    }

    if (this.usedFor === 'TASK') {
      this.config = {
        showIconClose: false,
        showOnlyMeOption: false,
        basicStyle: true,
      };
    }
  }

  toggleOrg(org: ExtendedSSOOrganizationDto) {
    org._isToggled = !org._isToggled;

    const filteredListOrg = this.listOrg.filter((item) =>
      _.startsWith(item.code, org.code + '.')
    );

    filteredListOrg.forEach((item) => {
      item._isToggled = org._isToggled;
    });
  }

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

    const listOrgChild = this.listOrg.filter((item) =>
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

  onSelectUser(user: ExtendedSSOTypeUserDto, org: ExtendedSSOOrganizationDto) {
    if (this.selectMode === 'LOCAL') {
      user._isSelected = !user._isSelected;

      org._totalUserSelected = org.listUser!.filter(
        (item) => item._isSelected
      ).length;

      org._isSelected =
        org._totalUserSelected === org._totalUser && org._totalUser > 0;
    } else if (this.selectMode === 'GLOBAL') {
      this.listOrg.forEach((item) => {
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
      const isSelected = !user._isSelected;

      this.listOrg.forEach((item) => {
        item.listUser!.forEach((u) => {
          u._isSelected = false;
        });

        item._totalUserSelected = 0;
      });

      user._isSelected = isSelected;
    }
  }

  //#region CLOSE

  onClose() {
    this.onCloseEvent.emit();
  }

  //#endregion

  //#region SAVE
  onSave() {
    let listUserSelected = [] as any[];

    if (this.selectMode === 'LOCAL') {
      listUserSelected = this.listOrg
        .filter((item) => item.listUser!.some((u) => u._isSelected))
        .map((item) =>
          SSOOrganizationDto.fromJS({
            ...item,
            listUser: item.listUser!.filter((u) => u._isSelected),
          })
        );
      // .flatMap((item) => item.listUser!.filter((u) => u._isSelected));
    } else if (this.selectMode === 'GLOBAL') {
      listUserSelected = this.listOrg
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
    this.listOrg.forEach((org) => {
      if (org.listUser)
        org.listUser.forEach((user) => {
          user._isSelected = this.listUserSelected.some((item) =>
            this.selectMode == 'GLOBAL'
              ? item.userId == user.key
              : item.userId == user.key
          );
        });

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
          : false;
    });
  }

  private async getListOrg() {
    this.listOrg = _.orderBy(
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

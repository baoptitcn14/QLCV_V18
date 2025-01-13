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
  OrganizationGuidGetDto,
  OrganizationUserOutputDto,
  SSO_OrganizationUserServiceProxy,
  SSO_SSOServiceProxy,
  SSOOrganizationDto,
  SSOTypeUserDto,
  UserDto,
  ValidationShareKeyDto,
} from '../../service-proxies/sso-service-proxies';
import { FormsModule } from '@angular/forms';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { firstValueFrom } from 'rxjs';
import _ from 'lodash';
import { SearchOrgUserPipe } from '../../pipes/search-org-user.pipe';
import { ButtonModule } from 'primeng/button';

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
  
  @Input({ required: true }) isOpen = false;
  @Input({ required: true }) listUserSelected: UserSelect[] = [];
  @Input() selectMode: 'LOCAL' | 'GLOBAL' = 'GLOBAL';
  @Input() listOrg: ExtendedSSOOrganizationDto[] = [];

  @Output() onSaveEvent = new EventEmitter<UserSelect[]>();

  constructor(private ssoServiceProxy: SSO_SSOServiceProxy) {}
  ngOnInit(): void {
    this.getListOrg()
      .then(() => {
        this.initData();
      })
      .finally(() => (this.isLoading = false));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listUserSelected']) {
      this.initData();
    }
  }

  toggleOrg(org: ExtendedSSOOrganizationDto) {
    org._isToggle = !org._isToggle;

    const filteredListOrg = this.listOrg.filter((item) =>
      _.startsWith(item.code, org.code + '.')
    );

    filteredListOrg.forEach((item) => {
      item._isToggle = org._isToggle;
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
    }
  }

  onClose() {
    
  }

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
        org.listUser.forEach((user) => ({
          ...user,
          _isSelected: this.listUserSelected.some(
            (item) => item.id === user.key
          ),
        }));

      org._filteredListUser = org.listUser;
      org._isToggle = false;
      org._totalUser = org.listUser!.length || 0;
      org._totalUserSelected = org.listUser!.filter(
        (item) => item._isSelected
      ).length;
      org._isSelected =
        org._totalUserSelected === org._totalUser && org._totalUser > 0;
    });
  }

  private async getListOrg() {
    this.listOrg = _.orderBy(
      (await firstValueFrom(
        this.ssoServiceProxy.getAll()
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

interface UserSelect extends UserDto {
  _isSelected: boolean;
}

export interface ExtendedSSOOrganizationDto extends SSOOrganizationDto {
  listUser: ExtendedSSOTypeUserDto[] | undefined;
  _filteredListUser: ExtendedSSOTypeUserDto[] | undefined;
  _totalUser: number;
  _isSelected: boolean;
  _isToggle: boolean;
  _totalUserSelected: number;
}

export interface ExtendedSSOTypeUserDto extends SSOTypeUserDto {
  _isSelected: boolean;
}

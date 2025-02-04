import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ExtendedSSOOrganizationDto,
  UserOrgSelectComponent,
  UserOrgSelectEvent,
} from '../user-org-select/user-org-select.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InfoDetailUserDto } from '../../service-proxies/qlcv-service-proxies';
import { TooltipModule } from 'primeng/tooltip';
import _ from 'lodash';

@Component({
  selector: 'app-user-select',
  standalone: true,
  imports: [UserOrgSelectComponent, OverlayPanelModule, TooltipModule],
  templateUrl: './user-select.component.html',
  styleUrl: './user-select.component.scss',
})
export class UserSelectComponent {
  @Input({ required: true }) listOrg: ExtendedSSOOrganizationDto[] = [];
  @Input() listUserSelected: InfoDetailUserDto[] = [];
  @Input() orgName: string = '';
  @Input() fullName: string = '';
  @Output() onUserSelectEvent = new EventEmitter<UserOrgSelectEvent>();

  cloneListOrg: ExtendedSSOOrganizationDto[] = [];
}

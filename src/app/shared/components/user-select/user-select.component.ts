import { Component, Input } from '@angular/core';
import {
  ExtendedSSOOrganizationDto,
  UserOrgSelectComponent,
} from '../user-org-select/user-org-select.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InfoDetailUserDto } from '../../service-proxies/qlcv-service-proxies';

@Component({
  selector: 'app-user-select',
  standalone: true,
  imports: [UserOrgSelectComponent, OverlayPanelModule],
  templateUrl: './user-select.component.html',
  styleUrl: './user-select.component.scss',
})
export class UserSelectComponent {
  @Input({ required: true }) listOrg: ExtendedSSOOrganizationDto[] = [];
  @Input() listUserSelected: InfoDetailUserDto[] = [];
  @Input() orgName: string = '';
  @Input() fullName: string = '';
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppSessionService } from '../../session/app-session.service';
import {
  SSO_UserServiceProxy,
  UserInt64GetDto,
} from '../../service-proxies/sso-service-proxies';
import { of, switchMap } from 'rxjs';
import { AppConst } from '../../app-const';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    OverlayPanelModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss',
})
export class TopComponent implements OnInit {
  listTenant = [
    {
      label: 'Ilearn',
      icon: 'pi pi-fw pi-building',
    },
    {
      label: 'Trenet',
      icon: 'pi pi-fw pi-building',
    },
  ];

  listRoute = [
    {
      label: 'Thông tin tài khoản',
      icon: 'pi pi-fw pi-info',
      routerLink: '/user-profile',
    },
    {
      label: 'Danh sách ứng dụng',
      icon: 'pi pi-fw pi-list',
      routerLink: '/join-application',
    },
    {
      label: 'Danh sách công ty',
      icon: 'pi pi-fw pi-building',
      routerLink: '/join-tenant',
    },
    {
      separator: true,
    },
    {
      label: 'Thoát',
      icon: 'pi pi-fw pi-sign-out',
    },
  ];

  formUyQuyen!: FormGroup;
  logoQlcv = AppConst.logoQlcvUrl;
  urlLogin = environment.loginUrl;

  constructor(
    public session: AppSessionService,
    private userServiceProxy: SSO_UserServiceProxy
  ) {}

  ngOnInit(): void {
    this.initFormUyenQuyen();
  }

  onUyQuyen(data: any) {
    console.log(data);
  }

  private initFormUyenQuyen() {
    this.formUyQuyen = new FormGroup({
      userId: new FormControl(null, Validators.required),
      emailAddress: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email],
      }),
      fullName: new FormControl(null, Validators.required),
      code: new FormControl(null, Validators.required),
      currentUserId: new FormControl(
        this.session.user?.id,
        Validators.required
      ),
    });

    this.formUyQuyen
      .get('emailAddress')!
      .valueChanges.pipe(
        switchMap((value: string) => {
          if (!value) {
            this.formUyQuyen.get('userId')!.setValue(null);
            this.formUyQuyen.get('fullName')!.setValue(null);
            return of([]);
          }

          return this.userServiceProxy.getUsers({
            search: value,
          } as UserInt64GetDto);
        })
      )
      .subscribe((res) => {
        var user = res.find((x) => x.emailAddress == 'vuidtt');
        console.log(user);
        if (user) {
          this.formUyQuyen.get('userId')!.setValue(user.id);
          this.formUyQuyen.get('fullName')!.setValue(user.fullName);
        } else {
          this.formUyQuyen.get('userId')!.setValue(null);
          this.formUyQuyen.get('fullName')!.setValue(null);
        }
      });
  }
}

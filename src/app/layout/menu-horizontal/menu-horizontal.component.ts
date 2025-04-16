import { Component, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TaskDialogComponent } from '../../dialogs/task-dialog/task-dialog.component';
import { CommonModule } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { NotifyDialogComponent } from '../../dialogs/notify-dialog/notify-dialog.component';

@Component({
  selector: 'app-menu-horizontal',
  standalone: true,
  imports: [MenubarModule, CommonModule],
  templateUrl: './menu-horizontal.component.html',
  styleUrl: './menu-horizontal.component.scss',
})
export class MenuHorizontalComponent {
  menus: MenuItem[] = [
    {
      label: 'Công việc',
      icon: 'pi pi-home',
      routerLink: '/dashboard',
    },
    {
      label: 'Demo',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Form',
          icon: 'pi pi-bolt',
          routerLink: '/demo/form',
        },
        {
          label: 'Dialog',
          icon: 'pi pi-server',
          routerLink: '/demo/dialog',
        },
      ],
    },
    {
      label: 'Dữ liệu',
      icon: 'pi pi-database',
    },
    {
      label: 'Tệp báo cáo',
      icon: 'pi pi-file',
      routerLink: '/file-report',
    },
    {
      label: 'Tra cứu',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Công việc',
          routerLink: '/search-task',
        },
        {
          label: 'Thông báo',
          routerLink: '/search-notify',
        },
        {
          label: 'Dữ liệu',
          routerLink: '/search/data',
        },
      ],
    },
    {
      label: 'Cấu hình',
      icon: 'pi pi-cog',
      items: [
        {
          label: 'Thiết lập báo cáo',
          routerLink: '/setting-reportdata',
        },
        {
          label: 'Thời gian',
          routerLink: '/setting-time',
        },
        {
          label: 'Data',
          routerLink: '/setting-data',
        },
        {
          label: 'Mẫu báo cáo dữ liệu',
          routerLink: '/setting-templatereport',
        },
        {
          label: 'Email',
          routerLink: '/setting-email',
        },
        {
          label: 'Công việc',
          routerLink: '/setting-task',
        },
        {
          label: 'Dữ liệu',
          routerLink: '/setting/Dữ liệu',
        },
        {
          label: 'Api dữ liệu',
          routerLink: '/setting/Api dữ liệu',
        },
        {
          label: 'Nhóm chat',
          routerLink: '/setting/Nhóm chát',
        },
      ],
    },
    {
      label: 'Quản lý danh mục',
      icon: 'pi pi-list',
      items: [
        {
          label: 'Bàn giao công việc',
          routerLink: '/category-workhandover',
        },
        {
          label: 'Loại công việc',
          routerLink: '/category/TASK/Loại công việc',
        },
        {
          label: 'Loại thông báo',
          routerLink: '/category/POST/Loại thông báo',
        },
      ],
    },
    {
      label: 'Tạo mới',
      icon: 'pi pi-plus',
      items: [
        {
          label: 'Công việc',
          command: () => {
            this.openTaskDialog();
          },
        },
        {
          label: 'Thông báo',
          command: () => {
            this.openNotifyDialog();
          },
        },
        {
          label: 'Dữ liệu',
          routerLink: '/new/data',
        },
        {
          label: 'Báo cáo',
          routerLink: '/new/report',
        },
      ],
    },
    {
      label: 'Hỗ trợ sữa lỗi',
      icon: 'pi pi-question',
      routerLink: '/trouble-shooting',
    },
  ];

  constructor(private dialogService: DialogService) {}

  private openTaskDialog() {
    this.dialogService.open(TaskDialogComponent, {
      breakpoints: {
        '1920px': '96vw',
        '1600px': '96vw',
        '960px': '75vw',
        '640px': '90vw',
      },
      styleClass: 'p-dialog-custom p-task-add-dialog',
      maximizable: true,
      
    });
  }

  private openNotifyDialog() {
    this.dialogService.open(NotifyDialogComponent, {
      breakpoints: {
        '1920px': '96vw',
        '1600px': '96vw',
        '960px': '75vw',
        '640px': '90vw',
      },
      styleClass: 'p-dialog-custom p-notify-add-dialog',
      maximizable: true,
      
    });
  }
}

import { Component, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TaskDialogComponent } from '../../dialogs/task-dialog/task-dialog.component';
import { CommonModule } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';

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
          routerLink: '/search/task',
        },
        {
          label: 'Thông báo',
          routerLink: '/search/notify',
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
    },
    {
      label: 'Quản lý danh mục',
      icon: 'pi pi-list',
      items: [
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
          routerLink: '/new/notify',
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
}

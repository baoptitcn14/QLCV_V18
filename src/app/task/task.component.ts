import { CheckboxModule } from 'primeng/checkbox';
import { AfterViewInit, Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';
import { SettingService } from '../shared/services/setting.service';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { SettingDto } from '../shared/service-proxies/qlcv-service-proxies';
import { Column } from '../shared/interfaces';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    PanelModule,
    CommonModule,
    FieldsetModule,
    CheckboxModule,
    FormsModule,
    
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements AfterViewInit{
  viewTaskNew: any = {};
  viewTaskDashboard: any = {};
  isFreeze: boolean | undefined;

  save = { emit: () => console.log('Lưu dữ liệu') };
  refresh = { emit: () => console.log('Làm mới dữ liệu') };

  configLayout = signal<any[]>([]);

  congViecData: any = {};  
  duLieuData: any = {};    

  isFreezeNameTask = true;
  isFreezeNgXuLy = true;
  columns: Column[] = [];
  settingDashboardColumn: SettingDto = new SettingDto();
  numberWeekShow = 3;
  numberMonthShow = 2;
  numberYearShow = 1;
  isShowLate = true;
  listFreeze: string[] = [];

  displayOptions = [
    { label: 'Trễ', checked: false, freeze: false },
    { label: 'Hôm nay', checked: false, freeze: false },
    { label: 'Tuần +1', checked: false, freeze: false },
    { label: 'Tuần +2', checked: false, freeze: false },
    { label: 'Tháng', checked: false, freeze: false },
    { label: 'Tháng +1', checked: false, freeze: false },
    { label: 'Năm', checked: false, freeze: false }
  ];
  

  constructor(
    private readonly _settingService: SettingService
  ){
    this.viewTaskNew = this._settingService.getSettingViewTaskNew();
    this.viewTaskDashboard = this._settingService.getSettingViewTaskDashboard();
  }
  ngAfterViewInit(): void {

    }
  }



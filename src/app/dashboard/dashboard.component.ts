import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DashboardContentComponent } from "./partials/dashboard-content/dashboard-content.component";
import { DashboardHeaderComponent } from "./partials/dashboard-header/dashboard-header.component";
import { SettingDto } from '../shared/service-proxies/qlcv-service-proxies';
import { DashboardService, DashboardConst } from '../shared/services/dashboard.service';
import { SupportService } from '../shared/services/support.service';
import { SettingService } from '../shared/services/setting.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    SplitButtonModule,
    DashboardContentComponent,
    DashboardHeaderComponent
],  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit , AfterViewInit{

  @ViewChild('actionViecCanLamTemplate') actionViecCanLamTemplate!: TemplateRef<any>;
  @ViewChild('actionBaoCaoNhanhTemplate') actionBaoCaoNhanhTemplate!: TemplateRef<any>;
  @ViewChild('actionViecThayDoiLienQuanTemplate') actionViecThayDoiLienQuanTemplate!: TemplateRef<any>;
  @ViewChild('actionViecBaoCaoChoDuyetTemplate') actionViecBaoCaoChoDuyetTemplate!: TemplateRef<any>;


  listGroup:any = [];
  listExclude = ['/app/management/dashboard/task', '/app/management/dashboard/post', '/app/management/dashboard/data', '/app/management/dashboard/transfer'];
  setting:any;
  constructor(
    private readonly _dashboardService:DashboardService,
    private readonly _spService:SupportService,
    private readonly _settingService:SettingService
  ){}
  ngOnInit():void {
    this.setting = this._settingService.getSettingViewTaskDashboard();
  }
  ngAfterViewInit(): void {
    this._dashboardService.buildGroup(this.listGroup, this.actionViecCanLamTemplate, this.actionBaoCaoNhanhTemplate,this.actionViecThayDoiLienQuanTemplate,this.actionViecBaoCaoChoDuyetTemplate);
    
  }
  onReload(){
    this.setupDataDashboard();
  }
  setupDataDashboard(data?:any) {
    let index = this.listGroup.findIndex((f:any) => f.key == DashboardConst.viecCanLams);
    this.listGroup[index]._isNhiemVu = false;
    this.listGroup[index]._isLoadNhiemVu = false;
    if (this.setting.value.autoSave) {
      var input =  this._spService.cloneDeep(this.setting);
      input.value = JSON.stringify(this.setting.value);
      input = SettingDto.fromJS(input);
      // this._settingServce.update(input).subscribe(res => {
      //   console.log('LUU CAU HINH THANH CONG');
      // })
    }
    // $('#dashboard').scrollTop(0);
    // $('#dashboard-table').scrollTop(0);
    var test = this._spService.getDataTest()
    this._dashboardService.setupData(this.listGroup,test,this.setting.value)
    console.log(this.listGroup)
     
  }
}

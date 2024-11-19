import { Injectable } from '@angular/core';
import { SupportService } from './support.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private readonly _spService:SupportService
  ) {}

  maxResultCount = 30;

  listData = {
    all: [],
    week: [],
    nextWeek: [],
    nextMonth: [],
  };

  viewDate = {
    type: {
      all: true,
      week: false,
      nextWeek: false,
      nextMonth: false,
    },
    class: {
      default: null,
      active: null,
    },

    callBack: (group: any, key: any) => {
      var notReset = false;
      (Object.keys(group.viewDate.type)).forEach(item => {
        if (item == key) {
          if (group.viewDate.type[item]) {
            notReset = true;
          }
          group.viewDate.type[item] = true;
        } else {
          group.viewDate.type[item] = false;
        }
      })
      group._isShow = true;
      group._isHidden = false;

      if (!notReset) {
        // this.resetGroup(group)
      }
    },
  };

  paged = {
    skipCount: this.maxResultCount,
    totalItem: 1,
  };
  listGroup = [
    {
      key: DashboardConst.viecCanLams,
      title: 'A. Việc cần làm',
      type: 'task',
      _isShow: true,
      _isHidden: false,
      _isNhiemVu: false,
      _isLoadNhiemVu: false,
      actionFast: {
        key: 'BAO_CAO',
        _isShow: false,
      },
      viewTask: TaskType.DANG_LAM,
      viewDate: this.viewDate,
      paged: this.paged,
      actionTemplate: null,
      listData: this.listData,
      listDisplay: [],
    },
    {
      key: DashboardConst.viecTreHans,
      title: 'B. Việc trễ hạn',
      type: 'task',
      _isShow: false,
      _isHidden: true,
      actionFast: {
        key: 'BAO_CAO',
        _isShow: false,
      },
      viewDate: this.viewDate,
      paged: this.paged,
      actionTemplate: null,
      listData: this.listData,
      listDisplay: [],
    },
    {
      key: DashboardConst.viecMoiThayDoiLienQuans,
      title: 'C. Việc mới - Thay đổi - Liên quan',
      type: 'task',
      _isShow: false,
      _isHidden: true,
      luaChon: luachon.LUA_CHON,
      viewDate: this._spService.cloneDeep(this.viewDate),
      paged: this._spService.cloneDeep(this.paged),
      actionTemplate: null,
      listData: this._spService.cloneDeep(this.listData),
      listDisplay: [],
    },
    {
      key: DashboardConst.thongBaoMois,
      title: 'D. Thông báo mới',
      type: 'post',
      _isShow: false,
      _isHidden: true,
      viewDate: this._spService.cloneDeep(this.viewDate),
      paged: this._spService.cloneDeep(this.paged),
      listData: this._spService.cloneDeep(this.listData),
      listDisplay: [],
    },
    {
      key: DashboardConst.thongBaoChoDuyets,
      title: 'E. Thông báo chờ duyệt',
      type: 'post',
      _isShow: false,
      _isHidden: true,
      allowSelectChild: false,
      viewDate: this._spService.cloneDeep(this.viewDate),
      paged: this._spService.cloneDeep(this.paged),
      actionTemplate: null,
      listData: this._spService.cloneDeep(this.listData),
      listDisplay: [],
    },
    {
      key: DashboardConst.viecMoiChoDuyets,
      title: 'F. Việc mới chờ duyệt',
      type: 'post',
      _isShow: false,
      _isHidden: true,
      actionFast: {
        key: 'DUYET',
        _isShow: false,
      },
      luaChon: luachon.TAT_CA,
      duyetNhanh: false,
      viewDate: this._spService.cloneDeep(this.viewDate),
      paged: this._spService.cloneDeep(this.paged),
      actionTemplate: null,
      listData: this._spService.cloneDeep(this.listData),
      listDisplay: [],
    },
    {
      key: DashboardConst.viecBaoCaoChoDuyets,
      title: 'G. Việc đã hoàn thành chờ duyệt',
      type: 'post',
      _isShow: false,
      _isHidden: true,
      actionFast: {
        key: 'DUYET',
        _isShow: false,
      },
      luaChon: luachon.TAT_CA,
      duyetNhanh: false,
      viewDate: this._spService.cloneDeep(this.viewDate),
      paged: this._spService.cloneDeep(this.paged),
      actionTemplate: null,
      listData: this._spService.cloneDeep(this.listData),
      listDisplay: [],
    },
    {
      key: DashboardConst.viecTamDungKhoiDongChoDuyets,
      title: 'H. Việc tạm dừng - Khời động lại chờ duyệt',
      type: 'TASK',
      _isShow: false,
      _isHidden: true,
      actionFast: {
        key: 'DUYET',
        _isShow: false,
      },
      luaChon: luachon.TAT_CA,
      duyetNhanh: true,
      allowSelectChild: false,
      viewDate: this._spService.cloneDeep(this.viewDate),
      paged: this._spService.cloneDeep(this.paged),
      actionTemplate: null,
      listData: this._spService.cloneDeep(this.listData),
      listDisplay: [],
    },
    {
      key: DashboardConst.quyTrinhBanGiaoDuLieuChoDuyets,
      title: 'I. Quy trình - Bàn giao chờ duyệt',
      type: 'transfer-workflow-data',
      _isShow: false,
      _isHidden: true,
      allowSelectChild: false,
      viewDate: this._spService.cloneDeep(this.viewDate),
      paged: this._spService.cloneDeep(this.paged),
      actionTemplate: null,
      listData: this._spService.cloneDeep(this.listData),
      listDisplay: [],
    },
  ];

  buildGroup(listGroup:any ,actionViecCanLamTemplate:any, actionBaoCaoNhanhTemplate:any,  actionViecThayDoiLienQuanTemplate?:any, actionViecBaoCaoChoDuyetTemplate?:any) {
    listGroup[0].actionTemplate = actionViecCanLamTemplate;
    listGroup[1].actionTemplate = actionBaoCaoNhanhTemplate;
    listGroup[2].actionTemplate = actionViecThayDoiLienQuanTemplate;
    listGroup[5].actionTemplate = actionViecBaoCaoChoDuyetTemplate;
    listGroup[6].actionTemplate = actionViecBaoCaoChoDuyetTemplate;
    listGroup[7].actionTemplate = actionViecBaoCaoChoDuyetTemplate;

    listGroup[0].viewDate.class.default = 'lbl-view-date-viec-can-lam defaultBtn';
    listGroup[1].viewDate.class.default = 'lbl-view-date-viec-tre-han defaultBtn';
    listGroup[2].viewDate.class.default = 'lbl-view-date-viec-moi-thay-doi-lien-quan defaultBtn';
    listGroup[3].viewDate.class.default = 'green-jungle defaultBtn';
    listGroup[4].viewDate.class.default = 'lbl-view-date-viec-bao-cao-cho-duyet defaultBtn';
    listGroup[5].viewDate.class.default = 'lbl-view-date-viec-bao-cao-cho-duyet defaultBtn';
    listGroup[6].viewDate.class.default = 'lbl-view-date-viec-bao-cao-cho-duyet defaultBtn';
    listGroup[7].viewDate.class.default = 'lbl-view-date-viec-bao-cao-cho-duyet defaultBtn';
    listGroup[8].viewDate.class.default = 'lbl-view-date-viec-bao-cao-cho-duyet defaultBtn';


    listGroup[0].viewDate.class.active = 'strong-blue activebtn';
    listGroup[1].viewDate.class.active = 'btn-danger activebtn';
    listGroup[2].viewDate.class.active = 'btn-light-blue activebtn';
    listGroup[3].viewDate.class.active = 'strong-blue activebtn';
    listGroup[4].viewDate.class.active = 'strong-blue activebtn';
    listGroup[5].viewDate.class.active = 'strong-blue activebtn';
    listGroup[6].viewDate.class.active = 'strong-blue activebtn';
    listGroup[7].viewDate.class.active = 'strong-blue  activebtn';
    listGroup[8].viewDate.class.active = 'strong-blue  activebtn';

  }
  setupData(listGroup:any, res:any, config:any) {
    // _.each(this.orderGroup, (item, index) => {
    //   _.each(res[item], itemRes => {
    //     itemRes._orderNew = 1;
    //   })
    //   var setupDateTime = this._datetimeService.convertDateToLong(this.datime);
    //   if (item == 'viecMoiChoDuyets') {
    //     var txt = 'viecBaoCaoChoDuyets';

    //     var data = _.cloneDeep(this.sorting(res[txt], config.listSorting));
    //     var listData: any[] = [];
    //     data.forEach((item:any) => {
    //       if (item.action != "PAUSETODO" && item.action != "RESTARTTODO") {
    //         listData.push(item);
    //       }
    //     });

    //     this.setupItem(listGroup[index], listData);
    //   } else {
    //     if (item == 'thongBaoMois') {
    //       var listData = []
    //       res[item] = this.sorting(res[item], config.listSorting);
    //       var listValue = _.filter(res[item], { 'bool1': true });
   
    //       listData = _.cloneDeep(_.filter(res[item], (o) => o.bool1 == false || o.bool1 == null));

    //       if (listValue.length > 0) {
    //         listValue.forEach(item => {
    //           if (item.hanHoanThanh < setupDateTime!) {
    //             // this._thongBaoServiceProxy.anThongBao(new GuidEntityDto({
    //             //   id: item.id
    //             // }))
    //           }
    //           else {
    //             listData.push(item);
    //           }
    //         })
    //       }
    //       this.setupItem(listGroup[index], listData);

    //     }
    //     else if (item == 'viecTamDungKhoiDongChoDuyets') {
    //       var txt = 'viecBaoCaoChoDuyets';

    //       var data = _.cloneDeep(this.sorting(res[txt], config.listSorting));

    //       var listData: any[] = [];
    //       data.forEach((item:any) => {
    //         if (item.action == "PAUSETODO" || item.action == "RESTARTTODO") {
    //           listData.push(item);
    //         }
    //       });

    //       this.setupItem(listGroup[index], listData);
    //     }
    //     else {
    //       res[item] = this.sorting(res[item], config.listSorting);
    //       this.setupItem(listGroup[index], res[item]);
    //     }
    //   }



    //   this.resetPage(listGroup[index]);

    //   listGroup[index].listDisplay = this.takeDataDefault(listGroup[index]);
    // })
  }

}
enum TaskType {
  DANG_LAM = 'DANG_LAM',
  TUONG_LAI = 'TUONG_LAI',
  TAT_CA = 'TAT_CA',
}
enum luachon {
  TAT_CA = 'TAT_CA',
  NHAN_VIEN = 'NHAN_VIEN',
  LUA_CHON = 'Lua_Chon',
  READ_ALL = 'Read_All',
  READ_CREATE = 'Read_Create',
}
export class DashboardConst {
  static viecCanLams = 'viecCanLams';
  static viecTreHans = 'viecTreHans';
  static viecMoiThayDoiLienQuans = 'viecMoiThayDoiLienQuans';
  static thongBaoMois = 'thongBaoMois';
  static viecMoiChoDuyets = 'viecMoiChoDuyets';
  static viecBaoCaoChoDuyets = 'viecBaoCaoChoDuyets';
  static viecTamDungKhoiDongChoDuyets = 'viecTamDungKhoiDongChoDuyets';
  static thongBaoChoDuyets = 'thongBaoChoDuyets';
  static quyTrinhBanGiaoDuLieuChoDuyets = 'quyTrinhBanGiaoDuLieuChoDuyets';
  static viecDuLieuHoatDongs = 'viecDuLieuHoatDongs';
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor() {}

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
      viewDate: structuredClone(this.viewDate),
      paged: structuredClone(this.paged),
      actionTemplate: null,
      listData: structuredClone(this.listData),
      listDisplay: [],
    },
    {
      key: DashboardConst.thongBaoMois,
      title: 'D. Thông báo mới',
      type: 'post',
      _isShow: false,
      _isHidden: true,
      viewDate: structuredClone(this.viewDate),
      paged: structuredClone(this.paged),
      listData: structuredClone(this.listData),
      listDisplay: [],
    },
    {
      key: DashboardConst.thongBaoChoDuyets,
      title: 'E. Thông báo chờ duyệt',
      type: 'post',
      _isShow: false,
      _isHidden: true,
      allowSelectChild: false,
      viewDate: structuredClone(this.viewDate),
      paged: structuredClone(this.paged),
      actionTemplate: null,
      listData: structuredClone(this.listData),
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
      viewDate: structuredClone(this.viewDate),
      paged: structuredClone(this.paged),
      actionTemplate: null,
      listData: structuredClone(this.listData),
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
      viewDate: structuredClone(this.viewDate),
      paged: structuredClone(this.paged),
      actionTemplate: null,
      listData: structuredClone(this.listData),
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
      viewDate: structuredClone(this.viewDate),
      paged: structuredClone(this.paged),
      actionTemplate: null,
      listData: structuredClone(this.listData),
      listDisplay: [],
    },
    {
      key: DashboardConst.quyTrinhBanGiaoDuLieuChoDuyets,
      title: 'I. Quy trình - Bàn giao chờ duyệt',
      type: 'transfer-workflow-data',
      _isShow: false,
      _isHidden: true,
      allowSelectChild: false,
      viewDate: structuredClone(this.viewDate),
      paged: structuredClone(this.paged),
      actionTemplate: null,
      listData: structuredClone(this.listData),
      listDisplay: [],
    },
  ];
  cloneDeep(obj: any, seen = new WeakMap()): any {
    if (obj === null || typeof obj !== 'object') return obj;
  
    if (seen.has(obj)) {
      return seen.get(obj); // Trả về giá trị đã clone trước đó
    }
  
    let clonedObj: any;
    if (obj instanceof Date) {
      clonedObj = new Date(obj);
    } else if (obj instanceof Map) {
      clonedObj = new Map();
      obj.forEach((value, key) => {
        clonedObj.set(key, this.cloneDeep(value, seen));
      });
    } else if (obj instanceof Set) {
      clonedObj = new Set();
      obj.forEach(value => {
        clonedObj.add(this.cloneDeep(value, seen));
      });
    } else if (Array.isArray(obj)) {
      clonedObj = obj.map(item => this.cloneDeep(item, seen));
    } else {
      clonedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = this.cloneDeep(obj[key], seen);
        }
      }
    }
  
    seen.set(obj, clonedObj); // Lưu đối tượng đã clone
    return clonedObj;
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

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryHardService {
  readonly listStatusBusiness = [
    {
      id: null,
      name: 'Tất cả',
      module: [
        'TASK',
        'SEARCH_TASK',
        'SEARCH_POST',
        'SEARCH_DATA',
        'SEARCH_WORKFLOW',
        'POST',
        'DATA',
        'WORKFLOW',
        'SEARCH_TRANSFER',
      ],
    },
    {
      id: 'APPROVE',
      name: 'Đã duyệt',
      fontColor: 'text-success',
      bgColor: 'text-bg-success',
      tagColor: 'success',
      module: [
        'TASK',
        'POST',
        'DATA',
        'WORKFLOW',
        'SEARCH_TASK',
        'SEARCH_POST',
        'SEARCH_DATA',
        'SEARCH_WORKFLOW',
        'SEARCH_TRANSFER',
      ],
    },
    {
      id: 'TODO',
      name: 'Chờ duyệt',
      class: 'yellow-lemon',
      fontColor: 'text-warning',
      bgColor: 'text-bg-warning',
      tagColor: 'warning',
      module: [
        'TASK',
        'POST',
        'DATA',
        'WORKFLOW',
        'SEARCH_TASK',
        'SEARCH_POST',
        'SEARCH_DATA',
        'SEARCH_WORKFLOW',
        'SEARCH_TRANSFER',
      ],
    },
    {
      id: 'DENY',
      name: 'Từ chối',
      fontColor: 'text-danger',
      bgColor: 'text-bg-danger',
      tagColor: 'danger',
      module: [
        'TASK',
        'POST',
        'DATA',
        'WORKFLOW',
        'SEARCH_WORKFLOW',
        'SEARCH_TRANSFER',
      ],
    },

    {
      id: 'REPORT',
      name: 'Báo cáo',
      fontColor: 'text-primary',
      bgColor: 'text-bg-primary',
      tagColor: 'primary',
      module: [],
    },
    {
      id: 'APPROVEREPORT',
      name: 'Duyệt báo cáo',
      fontColor: 'text-primary',
      bgColor: 'text-bg-primary',
      tagColor: 'primary',
      module: [],
    },
    {
      id: 'REPORTTODO',
      name: 'Báo cáo chờ duyệt',
      fontColor: 'text-warning',
      bgColor: 'text-bg-warning',
      tagColor: 'warning',
      module: ['TASK'],
    },
    {
      id: 'UPDATECREATETODO',
      name: 'Cập nhật tạo mới chờ duyệt',
      fontColor: 'text-warning',
      bgColor: 'text-bg-warning',
      tagColor: 'warning',
      module: [''],
    },
    {
      id: 'DENYREPORT',
      name: 'Từ chối báo cáo',
      fontColor: 'text-danger',
      bgColor: 'text-bg-danger',
      tagColor: 'danger',
      module: [],
    },
    {
      id: 'CANCELREPORT',
      name: 'Hủy báo cáo',
      fontColor: 'text-blue-hoki',
      bgColor: 'bg-blue-hoki',
      tagColor: 'secondary',
      module: [],
    },
    {
      id: 'PAUSE',
      name: 'Tạm dừng',
      fontColor: 'text-info',
      bgColor: 'text-bg-info',
      tagColor: 'info',
      module: ['TASK', 'DATA', 'SEARCH_TASK', 'SEARCH_DATA'],
    },
    {
      id: 'APPROVEPAUSE',
      name: 'Duyệt tạm dừng',
      fontColor: 'text-info',
      bgColor: 'text-bg-info',
      tagColor: 'info',
      module: [],
    },
    {
      id: 'PAUSETODO',
      name: 'Tạm dừng chờ duyệt',
      fontColor: 'text-warning',
      bgColor: 'text-bg-warning',
      tagColor: 'warning',
      module: [],
    },
    {
      id: 'DENYPAUSE',
      name: 'Từ chối tạm dừng',
      fontColor: 'text-danger',
      bgColor: 'text-bg-danger',
      tagColor: 'danger',
      module: [],
    },
    {
      id: 'CANCELPAUSE',
      name: 'Hủy Tạm dừng',
      fontColor: 'text-blue-hoki',
      bgColor: 'bg-blue-hoki',
      tagColor: 'secondary',
      module: [],
    },

    {
      id: 'RESTART',
      name: 'Khởi động lại',
      fontColor: 'text-info',
      bgColor: 'text-bg-info',
      tagColor: 'info',
      module: [],
    },
    {
      id: 'APPROVERESTART',
      name: 'Duyệt khởi động lại',
      fontColor: 'text-info',
      bgColor: 'text-bg-info',
      tagColor: 'info',
      module: [],
    },
    {
      id: 'RESTARTTODO',
      name: 'Khời động chờ duyệt',
      fontColor: 'text-warning',
      bgColor: 'text-bg-warning',
      tagColor: 'warning',
      module: [],
    },
    {
      id: 'FINISHTODO',
      name: 'Kết thúc chờ duyệt',
      fontColor: 'text-warning',
      bgColor: 'text-bg-warning',
      tagColor: 'warning',
      module: [],
    },
    {
      id: 'DENYRESTART',
      name: 'Từ chối khởi động lại',
      fontColor: 'text-danger',
      bgColor: 'text-bg-danger',
      tagColor: 'danger',
      module: [],
    },
    {
      id: 'CANCELRESTART',
      name: 'Hủy khởi động lại',
      fontColor: 'text-blue-hoki',
      bgColor: 'bg-blue-hoki',
      tagColor: 'secondary',
      module: [],
    },
    {
      id: 'FINISH',
      name: 'Kết thúc',
      fontColor: 'text-primary',
      bgColor: 'text-bg-primary',
      tagColor: 'primary',
      module: ['TASK', 'SEARCH_TASK', 'SEARCH_POST'],
    },
    {
      id: 'CANCEL',
      name: 'Hủy bỏ',
      fontColor: 'text-dark',
      bgColor: 'text-bg-dark',
      tagColor: 'contrast',
      module: ['TASK'],
    },
    {
      id: 'CREATE',
      name: 'Tạo mới',
      fontColor: 'text-success',
      bgColor: 'text-bg-success',
      tagColor: 'success',
      module: [],
    },
    {
      id: 'CREATETODO',
      name: 'Tạo mới chờ duyệt',
      fontColor: 'text-warning',
      bgColor: 'text-bg-warning',
      tagColor: 'warning',
      module: [],
    },
    {
      id: 'UPDATE',
      name: 'Cập nhật',
      fontColor: 'text-info',
      bgColor: 'text-bg-info',
      tagColor: 'info',
      module: [],
    },
    {
      id: 'UPDATETODO',
      name: 'Cập nhật chờ duyệt',
      fontColor: 'text-warning',
      bgColor: 'text-bg-warning',
      tagColor: 'warning',
      module: [],
    },
    {
      id: 'REPORTODO',
      name: 'Báo cáo chờ duyệt',
      fontColor: 'text-warning',
      bgColor: 'text-bg-warning',
      tagColor: 'warning',
      module: [],
    },
    {
      id: 'UPDATECREATE',
      name: 'Cập nhật tạo mới',
      fontColor: 'text-success',
      bgColor: 'text-bg-success',
      tagColor: 'success',
      module: [],
    },
    {
      id: 'APPROVECREATE',
      name: 'Phê duyệt tạo mới',
      fontColor: 'text-success',
      bgColor: 'text-bg-success',
      tagColor: 'success',
      module: [],
    },
    {
      id: 'APPROVEUPDATE',
      name: 'Phê duyệt thay đổi',
      fontColor: 'text-success',
      bgColor: 'text-bg-success',
      tagColor: 'success',
      module: [],
    },
    {
      id: 'CANCELREPORT',
      name: 'Hủy báo cáo',
      fontColor: 'text-dark',
      bgColor: 'text-bg-dark',
      tagColor: 'contrast',
      module: [],
    },
    {
      id: 'CANCELUPDATE',
      name: 'Hủy cập nhật',
      fontColor: 'text-dark',
      bgColor: 'text-bg-dark',
      tagColor: 'contrast',
      module: [],
    },

    {
      id: 'DENYUPDATE',
      name: 'Từ chối cập nhật',
      fontColor: 'text-danger',
      bgColor: 'text-bg-danger',
      tagColor: 'danger',
      module: [],
    },
  ];

  readonly listStatus = {
    list: [
      {
        id: 'ACTIVE',
        name: 'Hoạt động',
      },
      {
        id: 'BLOCK',
        name: 'Khóa',
      },
    ],
    transformText: {
      BLOCK: 'Khóa',
      ACTIVE: 'Hoạt động',
    },
  };
}

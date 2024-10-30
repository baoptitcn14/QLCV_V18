// import * as ClassicEditor from 'src/assets/js/ckeditorV31/ckeditor.js';

export class AppConst {
  static readonly authorization = {
    encrptedAuthTokenName: 'enc_auth_token',
    authToken: 'AuthToken',
  };

  static readonly listStatus = {
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

  static readonly messageToastr = {
    success: {
      insert: 'Thêm thành công!',
      update: 'Cập nhật thành công!',
      delete: 'Xóa thành công!',
    },
    error: {
      insert: 'Thêm thất bại!',
      update: 'Cập nhật thất bại!',
      delete: 'Xóa thất bại!',
    },
  };

  static readonly keySetting = {
    TENANT_INFO: 'TENANT_INFO',
  };

  static readonly tenantProfile = {
    tenantName: 'Công ty Ilearn',
    hotline: '089 639 6969',
    ext: '0258 3511 259',
    email: 'toancoyen@ilearn.net.vn',
    address: [
      {
        code: 'MDC',
        name: 'Trụ sở chính',
        address:
          '27A Mạc Đĩnh Chi - Phường Phước Tiến - TP Nha Trang - Tỉnh Khánh Hoà',
      },
      {
        code: 'HQ',
        name: 'Cơ sở 2',
        address:
          'STH 18.33, Đường 4D+8C, KĐT Hà Quang 2 - TP Nha Trang - Tỉnh Khánh Hoà',
      },
    ],
  };

  static readonly logoQlcvUrl = './logo_qlcv.png';

  // static readonly editor = ClassicEditor;
  static readonly placehoderImage = 'https://placehold.co/300x200';
}

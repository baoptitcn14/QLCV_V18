import { NgModule } from '@angular/core';
import { SSO_UserServiceProxy } from './sso-service-proxies';
import { Qlcv_CategoryServiceProxy } from './qlcv-service-proxies';
import { SSOO_UserServiceProxy } from './ssoo-service-proxies';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    // begin sso
    SSO_UserServiceProxy,
    // end sso

    SSOO_UserServiceProxy,

    // begin  qlcv
    Qlcv_CategoryServiceProxy,
    // end  qlcv
  ],
})
export class ServiceProxiesModule {}

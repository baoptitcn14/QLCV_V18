import { NgModule } from '@angular/core';
import { SSO_OrganizationClientServiceProxy, SSO_OrganizationServiceProxy, SSO_OrganizationUserServiceProxy, SSO_SSOServiceProxy, SSO_UserServiceProxy } from './sso-service-proxies';
import { Qlcv_CategoryServiceProxy } from './qlcv-service-proxies';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    // begin sso
    SSO_UserServiceProxy,
    SSO_OrganizationClientServiceProxy,
    SSO_OrganizationServiceProxy,
    SSO_OrganizationUserServiceProxy,
    SSO_SSOServiceProxy,
    // end sso

    // begin  qlcv
    Qlcv_CategoryServiceProxy,
    // end  qlcv
  ],
})
export class ServiceProxiesModule {}

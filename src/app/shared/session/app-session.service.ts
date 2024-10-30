import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AppConst } from '../app-const';
import { environment } from '../../../environments/environment.development';
import {
  SSO_UserServiceProxy,
  UserDto,
} from '../service-proxies/sso-service-proxies';
import { SSOO_UserServiceProxy } from '../service-proxies/ssoo-service-proxies';

@Injectable({
  providedIn: 'root',
})
export class AppSessionService {
  user: UserDto | null = null;

  constructor(
    private SSO_UserServiceProxy: SSO_UserServiceProxy,
    private SSOO_UserServiceProxy: SSOO_UserServiceProxy,
    private cookieService: CookieService
  ) {}

  get userId() {
    return this.user?.id;
  }

  init() {
    return new Observable((subscriber) => {
      let token = this.cookieService.get(AppConst.authorization.authToken);

      if (token)
        this.SSOO_UserServiceProxy.getCurrentUser().subscribe(
          (res) => {
            this.user = res;

            // subscriber.complete();
          },
          (error) => {
            
            this.cookieService.deleteAll('/', environment.domain);
            // location.href = environment.loginUrl;

            // subscriber.complete();
          },
          () => subscriber.complete()
        );
      else subscriber.complete();
    });
  }

  logout() {
    this.cookieService.deleteAll('/', environment.domain);
    location.href = environment.loginUrl;
  }
}

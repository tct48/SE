import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AppURL } from '../app.url';
import { AlertService } from '../share/services/alert.service';
import { AuthenService } from '../share/services/authen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authen: AuthenService,
    private alert:AlertService,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authen.getAuthenticate())
      return true;

    this.alert.notify("กรุณาล๊อกอินเข้าสู่ระบบ");
    this.router.navigate(['/', AppURL.Signin, { returnURL: state.url }]);
    return true;
  }

  canActivateChild(next:ActivatedRouteSnapshot, state:RouterStateSnapshot):|Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    return true;
  }

  canLoad(route:Route, setments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean{
    return true;
  }

}

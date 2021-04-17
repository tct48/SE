import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppURL } from '../app.url';
import { AlertService } from '../share/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {

  constructor(
      private alert:AlertService,
      private router: Router
  ){

  }

  AppURL = AppURL;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<boolean>((resolve, reject)=> {
      const roles = next.data.roles;
      let data = localStorage.getItem("snowmilk");
      if((roles.filter(item=>item==data)).length>0)
        resolve(true);
      else{
        this.alert.notify("คุณไม่มีสิทธิ์ในการเข้าใช้งานหน้าดังกล่าว!");
        this.router.navigate(["/", AppURL.Dashboard]);
        resolve(false);
      }
    })
  }
  
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppURL } from '../app.url';
import { AuthenService } from '../share/services/authen.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticationGuard implements CanActivate {
  constructor(
    private authen:AuthenService,
    private router: Router,
  ){

  }

  AppURL = AppURL;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authen.getAuthenticate()){
        this.router.navigate(['', AppURL.Dashboard]);
        return false
      }
    return true;
  }
  
}

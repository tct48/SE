import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthenService } from '../services/authen.service';

@Component({
  selector: 'app-auth-nav-bar',
  templateUrl: './auth-nav-bar.component.html',
  styleUrls: ['./auth-nav-bar.component.css']
})
export class AuthNavBarComponent implements OnInit {

  constructor(
    private authen:AuthenService,
    private router:Router,
    private alert:AlertService
  ) { }

  ngOnInit(): void {
  }

  loginPage:string = "/login";

  onLogout(){
    localStorage.removeItem(this.authen.getAuthenticate());
    this.router.navigateByUrl(this.loginPage);
    this.alert.success("ขอบคุณที่ใช้บริการ")
  }

}

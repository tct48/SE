import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../share/services/alert.service';
import { AuthenService } from '../share/services/authen.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private builder:FormBuilder,
    private router:Router,
    private alert:AlertService,
    private authen:AuthenService
  ) {
    this.initialForm();
   }

  ngOnInit(): void {
  }

  form:FormGroup;
  returnUrl:string = "/dashboard";

  initialForm() {
    this.form = this.builder.group({
      username:['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogin(){
    if(this.form.invalid){
      this.alert.notify("กรุณากรอกข้อมูลให้ครบถ้วน!");
      return ;
    }

    if(this.form.controls["username"].value=="admin" && this.form.controls["password"].value=="admin"){
      this.alert.success("ยินดีต้อนรับ");
      this.authen.setAuthenticate();
      this.router.navigateByUrl(this.returnUrl)
      return ;
    }

    this.alert.notify("กรอกข้อมูลไม่ถูกต้อง!");

  }

}

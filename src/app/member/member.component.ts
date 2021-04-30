import { Component, OnInit } from '@angular/core';
import { AlertService } from '../share/services/alert.service';
import { DashboardService } from '../share/services/dashboard.service';
import { OptionSearch } from '../share/services/product.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  constructor(
    private alert:AlertService,
    private dashboard:DashboardService
  ) { 
    this.loadItem();
  }

  ngOnInit(): void {
  }

  option:OptionSearch = {
    sp:1,
    lp:10
  };

  item:any={
    total_items:0,
    items:[]
  }

  loadItem(){
    this.dashboard.loadMember(this.option).then(result=>{
      this.item=result;
    })
  }

  pageChanged(event: any): void {
    this.option.sp = event.page;
    this.loadItem();
  }

}

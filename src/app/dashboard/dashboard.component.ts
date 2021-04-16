import { Component, OnInit } from '@angular/core';
import { ProductService } from '../share/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private prouduct:ProductService
  ) { 
    this.prouduct.loadProduct({sp:0,lp:1}).then(result=>{
      this.obj.goods = result.total_items;
    })
  }

  obj={
    income:0,
    sales:0,
    goods:0,
    visitor:0,
  }

  ngOnInit(): void {
  }

}

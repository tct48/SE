import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../share/services/dashboard.service';
import { ProductService } from '../share/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private prouduct:ProductService,
    private dashboard:DashboardService
  ) { 
    this.prouduct.loadProduct({sp:0,lp:1}).then(result=>{
      this.obj.goods = result.total_items;
    })
    if(localStorage.getItem("income")){
      this.obj.income = parseInt(localStorage.getItem("income"));
    }

    if(localStorage.getItem("lasted")){
      this.obj.lasted = parseInt(localStorage.getItem("lasted"));
    }

    if(localStorage.getItem("sales")){
      this.obj.sales = parseInt(localStorage.getItem("sales"));
    }
    this.loadBestSeller();
    this.loadMostVisited();
  }

  obj={
    income:0,
    sales:0,
    goods:0,
    visitor:0,
    lasted:0
  }

  kaka=[0,1,2];
  
  best_seller:any={
    items:[],
    total_items:0
  }

  most_visited:any = {
    items:[],
    total_items:0
  }

  ngOnInit(): void {
  }

  loadBestSeller(){
    this.dashboard.loadProductPopular().then(result=>{
      this.best_seller = result;
    })
  }

  loadMostVisited(){
    this.dashboard.loadProductVisited().then(result=>{
      this.most_visited = result;
    })
  }

}

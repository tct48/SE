import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../share/services/orders.service';

@Component({
  selector: 'app-supplies-print',
  templateUrl: './supplies-print.component.html',
  styleUrls: ['./supplies-print.component.css']
})
export class SuppliesPrintComponent implements OnInit {

  constructor(
    private activateRouter:ActivatedRoute,
    private order:OrdersService
  ) { 
    this.activateRouter.queryParams.forEach(element=>{
      if(element._id){
        this._id = element._id;
        console.log(element._id);
        this.getSupplie();
      }
    })
  }

  ngOnInit(): void {
  }

  view:boolean=true;

  _id:string;
  data:any;
  getSupplie(){
    this.order.getSupplie(this._id).then(result=>{
      console.log(result)
      this.data = result;
    })
  }

  onPrint(){
    this.view=false;
    setInterval(()=>{
      window.print();
      clearInterval();
    },1000)
  }

}

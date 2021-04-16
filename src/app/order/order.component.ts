import { formatDate } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from '../share/services/alert.service';
import { OrdersService } from '../share/services/orders.service';
import { OptionSearch } from '../share/services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();

  sp:number=0;
  lp:number=10;

  // for chart
  type = 'bar';
  data = {
    labels: [
      // "11 April", "12 April", "13 April", "14 April", "15 April"
    ],
    datasets: [
      // { data: [65, 59, 80, 81, 56, 55, 40], label: 'OverDose', backgroundColor: '#1abc9c' },
      // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Gelato', backgroundColor: '#1f009c' },
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: true
  };

  option:OptionSearch={
    sp:0,
    lp:this.lp
  }
  // chart
  o: any = {
    orders: [],
    total_items: 0
  }

  // graph
  g: any = {
    graphs: [],
    total_items: 0
  }

  // order_detail
  od: any = {
    orders:0,
    detail:[]
  };

  constructor(
    private orders: OrdersService,
    private alert:AlertService,
    private modalService: BsModalService,
  ) {
    this.loadOrders(this.option);
  }

  pageChanged(event: any): void {
    this.option.sp = event.page;
    this.sp = event.page;
    this.loadOrders({ sp: event.page - 1, lp: this.option.lp });
  }

  loadOrders(option:OptionSearch){
    this.orders.loadOrders(option).then(result=>{
      this.o.orders = result.items;
      this.o.total_items = result.total_items;
    })
  }

  modalRef: BsModalRef;

  openModal(template: TemplateRef<any>, _id: string) {
    this.modalRef = this.modalService.show(template, { id: 1, class:'modal-lg' });
    this.orders.loadOrders({sp:0,lp:0},_id).then(result=>{
      let dumb = {
        _id:result.items[0]._id,
        user: result.items[0].user,
        dor: result.items[0].dor,
        total: result.items[0].total
      }
      this.od.orders = dumb;
      this.od.detail = result.items;
    })
  }

  onUpdateStatus(_id:string, status:number){
    this.orders.updateOrders({_id:_id, status:status}).then(result=>{
      this.alert.success("เปลี่ยนสถานะสำเร็จ")
      this.loadOrders({sp:0,lp:this.lp});
    })
  }

  onSearch() {
    // 2021-04-14T00:00:00.000
    var before = formatDate(this.bsInlineRangeValue[0], 'y-MM-dT00:00:00.000', 'en-US');
    var after = formatDate(this.bsInlineRangeValue[1], 'y-MM-dT00:00:00.000', 'en-US');
    this.orders.loadOrdersBetween({ sp: 0, lp: 10 }, { before, after }).then(result => {
      this.o.orders = result.items;
      this.o.total_items = result.total_items;
      console.log(result);
    })

    this.data.labels=[];
    this.data.datasets=[];


    this.orders.loadPlotGraph({ before, after }).then(result => {
      this.g.graphs = result.items;
      this.g.total_items = result.total_items;

      var overdose = [];
      var gelato = [];

      this.g.graphs.forEach(element => {
        this.data.labels.push(formatDate(element.dor, 'd MMMM', 'en-US'));
        overdose.push(element.overdose);
        gelato.push(element.gelato);
        // { data: [65, 59, 80, 81, 56, 55, 40], label: 'OverDose', backgroundColor: '#1abc9c' },
        // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Gelato', backgroundColor: '#1f009c' },
      });
      this.data.datasets.push({data:overdose,label:'OverDose',backgroundColor:'#1abc9c'})
      this.data.datasets.push({data:gelato,label: 'Gelato', backgroundColor: '#1f009c'})
    });

  }

  ngOnInit(): void {
  }


}

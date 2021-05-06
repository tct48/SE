import { formatDate } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from '../share/services/alert.service';
import { AuthenService } from '../share/services/authen.service';
import { OptionSearch, OrdersService } from '../share/services/orders.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();

  sp: number = 0;
  lp: number = 10;

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

  option: OptionSearch = {
    sp: 0,
    lp: this.lp
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
    orders: 0,
    detail: []
  };

  constructor(
    private orders: OrdersService,
    private alert: AlertService,
    private modalService: BsModalService,
    private authen: AuthenService,
    private router: Router
  ) {
    this.loadOrders(this.option);
  }

  pageChanged(event: any): void {
    this.option.sp = event.page - 1;
    this.sp = event.page;
    this.loadOrders(this.option);
  }

  loadOrders(option: OptionSearch) {
    this.orders.loadOrders(option).then(result => {
      console.log(result) 
      this.o.orders = result.items;
      this.o.total_items = result.total_items;
      localStorage.setItem("sales", result.total_items);
      var date = new Date().valueOf().toString();
      localStorage.setItem("lasted", date);
    })
  }

  modalRef: BsModalRef;
  onUpdateSupplie(_id: string) {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1']
    }).queue([
      {
        title: 'เลขพัสดุ !?',
        text: 'กรุณากรอกเลขพัสดุของลูกค้า'
      }
    ]).then((result) => {
      if (result.value[0]) {
        var obj = {
          _id: _id,
          supplies: result.value[0]
        }
        this.orders.updateSupp(obj).then(result => {
          console.log(result)
          console.log(this.option)
          this.loadOrders({ sp: Number(this.option.sp) - 1, lp: this.option.lp });
        })
      } else {
        this.alert.notify("กรุณากรอกเลขพัสดุ")
      }
    })

  }

  onDelete(_id: string) {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่ที่จะลบข้อมูล ?',
      text: 'เมื่อลบข้อมูลแล้วข้อมูลจะสูยหายทันที',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ฉันต้องการลบข้อมูล!',
      cancelButtonText: 'ยกเลิก'
    }).then(result => {
      if (result.value) {
        this.orders.deleteOrders(_id).then(result => {
          this.option.sp = 0;
          this.loadOrders(this.option);
          this.alert.success("ลบข้อมูลสำเร็จ!");
        })
      }
    })

  }

  address: any;

  openModal(template: TemplateRef<any>, _id: string) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg', ignoreBackdropClick: true });
    this.orders.loadOrders({ sp: 0, lp: 0 }, _id).then(result => {
      console.log(result)
      let dumb = {
        _id: result.items[0]._id,
        user: result.items[0].user,
        dor: result.items[0].dor,
        total: result.items[0].total
      }
      this.od.orders = dumb;
      this.od.detail = result.items;
    })
    // Jakiro
    this.orders.getAddressByOrdersID(_id).then(result => {
      this.address = result.items[0];
    })
  }

  payment: any = {
    orders: null,
    amount: null,
    bank: null,
    dor: null,
    verify: null
  }

  openModalVerify(template: TemplateRef<any>, _id: string) {
    this.orders.loadPaymentByID(_id).then(result => {
      if (result.total_items == 0) {
        this.alert.notify("ผู้ใช้ยังไม่ทำการแจ้งชำระเงิน!")
        return;
      }
      this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg', ignoreBackdropClick: true });
      console.log(result);
      this.payment = result;
    })
  }

  onPrint(_id) {
    window.open("http://www.dee-jung.com/snowmilk/backend/#/supplier?_id=" + _id, '_blank');
  }


  onUpdateStatus(_id: string, status: number) {
    if (status == 3) {
      Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1']
      }).queue([
        {
          title: 'เลขพัสดุ !?',
          text: 'กรุณากรอกเลขพัสดุของลูกค้า'
        }
      ]).then(res => {
        if (res.value[0]) {
          this.orders.updateOrders({ _id: _id, status: status }).then(result => {
            this.loadOrders({ sp: Number(this.option.sp) - 1, lp: this.lp });
            var obj = {
              _id: _id,
              supplies: res.value[0]
            }
            this.orders.updateSupp(obj).then(result => {
              this.loadOrders({ sp: Number(this.option.sp) - 1, lp: this.option.lp });
            })
          })
        } else {
          this.alert.notify("กรุณากรอกเลขพัสดุ")
        }
      })
    } else {
      this.orders.updateOrders({_id:_id,status:status}).then(result=>{
        this.alert.success("เปลี่ยนสถานะสำเร็จ")
        this.loadOrders({ sp: Number(this.option.sp) - 1, lp: this.lp });
      })
    }
  }

  old: any = [];

  onSearch() {
    // 2021-04-14T00:00:00.000
    if (this.old[0] == this.bsInlineRangeValue[0] && this.old[1] == this.bsInlineRangeValue[1]) {
      return;
    }

    this.option.before = formatDate(this.bsInlineRangeValue[0], 'y-MM-dT00:00:00.000', 'en-US');
    this.option.after = formatDate(this.bsInlineRangeValue[1], 'y-MM-dT00:00:00.000', 'en-US');
    var before = this.option.before;
    var after = this.option.after;
    this.orders.loadOrdersBetween({ sp: 0, lp: 10 }, { before, after }).then(result => {
      this.o.orders = result.items;
      this.o.total_items = result.total_items;
    })

    this.data.labels = [];
    this.data.datasets = [];
    this.old = [];


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
      this.data.datasets.push({ data: overdose, label: 'OverDose', backgroundColor: '#1abc9c' })
      this.data.datasets.push({ data: gelato, label: 'Gelato', backgroundColor: '#1f009c' })
    });
    this.old.push(this.bsInlineRangeValue[0])
    this.old.push(this.bsInlineRangeValue[1])
  }

  ngOnInit(): void {
  }


}

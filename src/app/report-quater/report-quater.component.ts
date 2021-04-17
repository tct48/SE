import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { AlertService } from '../share/services/alert.service';
import { OrdersService } from '../share/services/orders.service';

@Component({
  selector: 'app-report-quater',
  templateUrl: './report-quater.component.html',
  styleUrls: ['./report-quater.component.css']
})
export class ReportQuaterComponent implements OnInit {
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();

  // for chart
  type = 'bar';
  data = {
    // "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    labels: [],
    datasets: [
      // { data: [], label: 'OverDose', backgroundColor: ['#194350', '#194350', '#194350', '#ff8882', '#ff8882', '#ff8882', '#ffc2b4', '#ffc2b4', '#ffc2b4', '#9dbeb9', '#9dbeb9', '#9dbeb9'] },
    ],
    options: {
      scales: {
        y: {
          min: 10
        }
      }
    }
  };

  type2 = 'doughnut';
  data2 = {
    labels: [

    ],
    datasets: [
      // { data: [648, 544], label: 'OverDose', backgroundColor: ['#1abc9c', '#FF1b9c'] },
    ],
    options: {
      scales: {
        y: {
          min: 10
        }
      }
    }
  };

  options = {
    responsive: true,
    maintainAspectRatio: true,
  };
  // chart

  constructor(
    private orders: OrdersService,
    private alert: AlertService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
    this.loadDoughNut();
  }

  dumb: any = [];
  quatar: any = [];
  old: string = null;
  doughnut: any = {
    overdose: 0,
    gelato: 0,
  }
  label_doughnut:any = ["Overdose", "Gelato"]

  // percent
  p:any = {
    overdose:0,
    gelato:0
  }

  loadOrder() {
    if (this.old == "loadOrder()" && this.data.datasets.length != 0) {
      this.data.datasets = [];
      this.data.labels = [];
      this.data2.labels = [];
      this.data2.datasets = [];
      return;
    }
    var date = new Date().getFullYear();
    this.data.labels = [];
    this.data.datasets = [];
    this.data2.labels = [];
    this.data2.datasets = [];
    // this.data.datasets.push({data:gelato,label: 'Gelato', backgroundColor: '#1f009c'})
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    month.forEach(element => {
      this.data.labels.push(element);
    });

    // this.data.labels=[];
    this.data.datasets = [];
    this.quatar = [];

    this.orders.loadQuater(date).then(result => {
      this.dumb = result.items;

      var intira = [];


      this.dumb.forEach(element => {
        // คำนวณไตรมาสก์แรก
        if (element.Jan == null)
          intira.push(0)
        else {
          intira.push(parseInt(element.Jan));
        }

        if (element.Feb == null)
          intira.push(0)
        else {
          intira.push(parseInt(element.Feb));
        }

        if (element.Mar == null)
          intira.push(0)
        else {
          intira.push(parseInt(element.Mar));
        }

        if (element.Apr == null)
          intira.push(0)
        else {
          intira.push(parseInt(element.Apr));
        }

        if (element.May == null)
          intira.push(0)
        else {
          intira.push(parseInt(element.May));
        }

        if (element.Jun == null)
          intira.push(0)
        else {
          intira.push(parseInt(element.Jun));
        }

        if (element.Jul == null)
          intira.push(0)
        else {
          intira.push(parseInt(element.Jul));
        }

        if (element.Aug == null)
          intira.push(0)
        else {
          intira.push(parseInt(element.Aug));
        }

        if (element.Sep == null)
          intira.push(0)
        else {
          intira.push(parseInt(element.Sep));
        }

        if (element.Oct == null)
          intira.push(0)
        else {
          intira.push(parseInt(element.Oct));
        }

        if (element.Nov == null)
          intira.push(0)
        else {
          intira.push(parseInt(element.Nov));
        }

        if (element.Dec == null)
          intira.push(0)
        else {
          intira.push(parseInt(element.Dec));
        }

        this.quatar.push(intira[0] + intira[1] + intira[2]);
        this.quatar.push(intira[3] + intira[4] + intira[5]);
        this.quatar.push(intira[6] + intira[7] + intira[8]);
        this.quatar.push(intira[9] + intira[10] + intira[11]);

      });


      this.data.datasets.push({ data: intira, label: ['รายได้ภายในปีทั้งหมด'], backgroundColor: ['#194350', '#194350', '#194350', '#ff8882', '#ff8882', '#ff8882', '#ffc2b4', '#ffc2b4', '#ffc2b4', '#9dbeb9', '#9dbeb9', '#9dbeb9'] })
      console.log(this.quatar);
      this.old = "loadOrder()";
    })

  }

  loadDoughNut() {
    this.orders.loadDoughNut().then(result => {
      this.doughnut = result.items[0];
      console.log(this.doughnut);
    })
  }

  onReload() {
    this.loadOrder();
    // เพิ่ม Label ให้กับ Doughnut
    this.label_doughnut.forEach(element => {
      this.data2.labels.push(element);
    });
    this.data2.datasets.push({data:[this.doughnut.overdose,this.doughnut.gelato],backgroundColor: ['#1abc9c', '#FF1b9c']});
    this.p.overdose = parseInt(this.doughnut.overdose)*100/(parseInt(this.doughnut.overdose) + parseInt(this.doughnut.gelato));
    this.p.gelato = parseInt(this.doughnut.gelato)*100/(parseInt(this.doughnut.gelato) + parseInt(this.doughnut.overdose));
  }

  onRandom() {

    if (this.old == "onRandom()" && this.data.datasets.length != 0) {
      this.data.datasets = [];
      this.data.labels = [];
      return;
    }
    this.data.labels = [];
    this.data.datasets = [];


    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    month.forEach(element => {
      this.data.labels.push(element);
    });

    this.data.datasets.push({
      data: [Math.floor(Math.random() * 1000000), Math.floor(Math.random() * 1000000), Math.floor(Math.random() * 1000000), Math.floor(Math.random() * 1000000), Math.floor(Math.random() * 1000000), Math.floor(Math.random() * 1000000), Math.floor(Math.random() * 1000000), Math.floor(Math.random() * 1000000), Math.floor(Math.random() * 1000000), Math.floor(Math.random() * 1000000), Math.floor(Math.random() * 1000000), Math.floor(Math.random() * 1000000)],
      label: ['รายได้ภายในปีทั้งหมดในปี 2021'],
      backgroundColor: ['#194350', '#194350', '#194350', '#ff8882', '#ff8882', '#ff8882', '#ffc2b4', '#ffc2b4', '#ffc2b4', '#9dbeb9', '#9dbeb9', '#9dbeb9']
    })
    this.old = "onRandom()";
  }

  ngOnInit(): void {
  }
}

import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../share/services/orders.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();

  // for chart
  type = 'line';
  data = {
    labels: ["2020", "2021"],
    datasets: [
      // { data: [2368200, 350000], label: 'OverDose', backgroundColor: '#1abc9c' },
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
    labels: ["Overdose", "Gelato"],
    datasets: [
      // { data: [2368200, 350000], label: 'OverDose', backgroundColor: ['#1abc9c','#FF1b9c'] },
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
  doughnut: any = {
    overdose: 0,
    gelato: 0,
  }

  // percent
  p: any = {
    overdose: 0,
    gelato: 0
  }

  r: any = {
    report: [],
    total_items: 0
  }
  start_value: number = 206700;
  caret: any = 0;

  constructor(private orders: OrdersService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
    this.loadDoughNut();
    this.loadReport();
    this.loadInterval();
  }

  loadInterval(){
    var b=0;
    var x = setInterval(()=>{
      this.onReload();
      if(b==0){
        clearInterval(x);
      }
    },300)
  }

  onReload() {
    this.data2.datasets.push({ data: [this.doughnut.overdose, this.doughnut.gelato], backgroundColor: ['#1abc9c', '#FF1b9c'] })
    this.p.overdose = parseInt(this.doughnut.overdose) * 100 / (parseInt(this.doughnut.overdose) + parseInt(this.doughnut.gelato));
    this.p.gelato = parseInt(this.doughnut.gelato) * 100 / (parseInt(this.doughnut.gelato) + parseInt(this.doughnut.overdose));
    console.log(this.p)

  }

  loadDoughNut() {
    this.orders.loadDoughNut().then(result => {
      this.doughnut = result.items[0];
    });
  }

  loadReport() {

    this.orders.loadReport().then(result => {
      this.r.report = result.items;
      this.r.total_items = result.total_items;
      console.log(this.r);

      this.caret = (parseInt(this.r.report[0].amount) - this.start_value) / this.start_value * 100;
      localStorage.setItem("income", this.caret);
      var date = new Date().valueOf().toString();
      localStorage.setItem("lasted", date);


      var x = result.items;
      var label = [];
      var dumb = [206700];
      x.forEach(element => {
        dumb.push(element.amount);
        label.push(element.year);
      });

      this.data.datasets.push({ data: dumb, label: 'income', backgroundColor: ['#1abc9c', '#FF1b9c'] })
    })
  }

  ngOnInit(): void {
  }

}

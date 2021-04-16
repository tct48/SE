import { Component, OnInit } from '@angular/core';

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
  type = 'bar';
  data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55], label: 'OverDose', backgroundColor: '#1abc9c' },
    ],
    options: {
      scales: {
        y: {
          min: 10
        }
      }
    }
  };

  type2='doughnut';
  data2 = {
    labels: ["Overdose", "Gelato"],
    datasets: [
      { data: [65, 35], label: 'OverDose', backgroundColor: ['#1abc9c','#FF1b9c'] },
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

  constructor() {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }

  ngOnInit(): void {
  }

}

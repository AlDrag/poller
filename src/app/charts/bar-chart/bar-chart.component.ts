import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';

import Chart from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {
  @ViewChild('barChart') barChart: ElementRef;

  @Input() data: {labels: string[], values: number};

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const {data} = changes;

    if (data.firstChange) {
        this.initGraph();
    }
  }

  ngOnInit() {
    
  }

  initGraph() {
    const myChart = new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
            labels: this.data.labels,
            datasets: [{
                label: '# of Votes',
                data: this.data.values,
                backgroundColor: 'rgba(255, 0, 0, 0.8)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
      });
  
      Chart.defaults.global.defaultColor = 'rgba(255, 0, 0, 0.4)';
  }
}

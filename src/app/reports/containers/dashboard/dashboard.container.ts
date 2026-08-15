import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.container.html',

  styleUrl: './dashboard.container.css',
})
export class DashboardContainer implements AfterViewInit {
  @ViewChild(HighchartsChartComponent) chartContainer!: any;
  renderedCanvas: any;
  title: string = 'Reports Machine 1';
  ngAfterViewInit() {
    this.renderChart();
  }

  async exportChart() {
    const chartContainer = this.chartContainer.chart;
    if (chartContainer) {
      // chartContainer.exportChart({
      //   type: 'image/png',
      //   filename: 'my_chart',
      //   callback: function (base64: any) {
      //      alert("callback");
      //   }
      // });
    }

    // let canvasChart = chartContainer.getSVGForExport();
    const svg = chartContainer.getSVG();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    const image = new Image();
    image.src = 'data:image/svg+xml;base64,' + window.btoa(svg);

    image.onload = await function () {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      const base64 = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.setAttribute('href', base64);
      link.setAttribute('download', 'test');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  }

  downloadBase64(file: string, name: string) {
    const link = document.createElement('a');
    link.setAttribute('href', file);
    link.setAttribute('download', name);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'spline',
      width: 800,
      height: 400,
    },
    xAxis: {
      title: {
        text: 'Time (sec)',
        style: {
          fontWeight: 'bold',
        },
      },
    },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
    },
    yAxis: {
      title: {
        text: 'Load (lbs)',
        style: {
          fontWeight: 'bold',
        },
      },
      labels: {
        format: '{value}',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        marker: {
          symbol: 'circle',
          fillColor: '#FFFFFF',
          enabled: false,
          radius: 2.5,
          lineWidth: 1,
        },
      },
    },
    tooltip: {
      headerFormat: '<b>Seconds: {point.x}</b><br>',
      pointFormat: 'Weight: {point.y}',
    },
    exporting: {
      enabled: true,
    },
    series: [
      {
        name: 'Weight',
        type: 'spline',
        color: 'black',
        data: [
          [0, 0],
          [0.2, 0],
          [0.4, 0],
          [0.5, 0],
          [0.6, 0],
          [0.7, 0],
          [0.8, 0],
          [0.9, 0],
          [1.0, 0],
          [1.1, 0],
          [1.2, 0],
          [1.3, 0],
          [1.4, 0],
          [1.5, 0],
          [1.6, 0],
          [1.7, 30],
          [1.8, 80],
          [1.9, 90],
          [1.95, 100],

          [2, 2000],
          [4, 4000],
          [6, 6000],
          [8, 8000],
          [10, 10000],
          [12, 12000],
          [14, 14000],
          [16, 16000],
          [18, 18000],
          [20, 19000],
          [21, 19000],
          [22, 19000],
          [23, 19000],
          [24, 19000],
          [25, 19000],
          [26, 19000],
          [27, 19000],
          [28, 0],
        ],
      },
    ],
  };
  isHighcharts: boolean = true;
  renderChart() {}
}

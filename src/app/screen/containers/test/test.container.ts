import { Component, ElementRef, OnInit } from '@angular/core';
import { TestService } from '@Services/test/test.service';
import { UserViewModel } from '@ViewModels/users/UserViewModel';
import { ModalscreenComponent } from '@Screen/components/modal-screen/modalscreen.component';
import { ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { TestInputModel } from '@InputModels/testReport/TestInputModel';
import { FormtestComponent } from '@Screen/components/form-screen/formtest.component';
import { LoginInputModel } from '@InputModels/user/LoginInputModel';
import { fromEvent, interval, map, Subscription } from 'rxjs';
import { SignalRService } from '@Services/signalR/signalR.service';
import { NotificationService } from '@Services/notifications/notification.service';
import Swal from 'sweetalert2';
import { ApipdfService } from '@Services/Report/apipdf.service';
import { Injectable } from '@angular/core';

HC_exporting(Highcharts);

@Component({
  selector: 'app-test',
  templateUrl: './test.container.html',
  styleUrls: ['./test.container.css'],
})
export class TestComponent implements OnInit {
  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;
  canvaContext!: CanvasRenderingContext2D;
  canvasElement!: HTMLCanvasElement;
  dimension = { width: 770, height: 400 };
  isWriting = false;
  SignatureOnBase64DB=''
  public testFInish: number = 1;
  private subscription: Subscription;
  model: TestInputModel = new TestInputModel();
  title: string = 'Test Management';
  user: UserViewModel | null = null;
  @ViewChild(ModalscreenComponent) modalTest!: ModalscreenComponent;
  @ViewChild(FormtestComponent) testscreen2!: FormtestComponent;
  selectedCategories: any[] = [];
  chartData: { x: number; y: number }[] = [];
  chartWidth: number = 1275;
  testId!: number;
  Duration=0;
  maxNumber=0;
  minNumber=0;
  public categories: any[] = [
    { name: 'PASS', key: 'A', selected: false },
    { name: 'FAIL', key: 'M', selected: false },
    { name: 'ABANDON', key: 'P', selected: false },
  ];
  loginForm: any;
  model2: LoginInputModel = new LoginInputModel();
  UserService: any;
  router: any;
  constructor(
    private reporGenerator:ApipdfService,
    private testService: TestService,
    private signalrService: SignalRService,
    private not: NotificationService,
  ) {
    const timer = interval(0);
    this.subscription = timer.subscribe();
  }
  ngOnInit(): void {
    this.signalrService.flagTraking.subscribe((flag: number) => {
      this.testFInish = flag;
    });
  }

  public flagforSpinner = false;
  public flagforTest = true;
  public flagforChart= true;
  public disabled:boolean = false
  getValuesFromChart() {
    const timer = interval(10000);
    this.subscription = timer.subscribe(() => {
      if (this.testFInish === 0) {
        this.flagforSpinner=true
        this.subscription.unsubscribe();
        this.not.showSuccess('Test successfully completed');
        this.flagforSpinner=false
        this.getDuration()
        this.flagforChart = true; //clave
        this.reporGenerator.Getpdf(this.testId).pipe( 
        )
        .subscribe({
          next:(r)=>{
            this.not.showSuccess('Report generated sucefully!','Sucess Report');
            this.saveSignature(r.body);
          },
          error: (error) => {
            this.not.showError('An error occurred while generating the report:', error)
          } 
      });
      } else this.methodBySecond();
    });
  }


  
  methodBySecond() {
    setTimeout(() => {
      this.cleanArrays();
      this.getValuesFromDBbyTestID();
    }, 5000);
  }

  changevalue() {
    this.flagforTest = true;
  }

  sendValues(e: any) {
    this.testId = e;
  }

  chart: Highcharts.Chart | undefined;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
      width: this.chartWidth,
      height: 375,
    },
    accessibility: {
      enabled: false,
    },
    xAxis: {
      title: {
        text: 'X (sec)',
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
        text: 'Y',
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
          fillColor: 'RED',
          enabled: false,
          radius: 2.5,
          lineWidth: 1,
          animation: false,
        },
        animation: {
          duration: 5000,
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
        type: 'line',
        color: 'black',

        data: this.chartData,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
            },
          },
        },
      ],
    },
  };

  getValuesFromDBbyTestID() {
    this.cleanArrays();
    this.testService.getCoordinates(this.testId).subscribe({
      next: (values) => {
        {
          values.dataResponse.forEach((value, index) => {
            this.chartData.push({
              x: values.dataResponse[index].x,
              y: values.dataResponse[index].y,
            });
          });
        }
        this.maxNumber = Math.max(...this.chartData.map(data => data.y));
        this.minNumber = Math.min(...this.chartData.map(data => data.y));
        Highcharts.chart('HCUpdate', this.chartOptions);
      },
    });
  }

  isHighcharts: boolean = false;

  insert() {
    this.model.signature = this.SignatureOnBase64DB;
    this.testscreen2.InsertOnDataBase(); 
    this.getValuesFromDBbyTestID();
    this.getValuesFromChart();
  }
  
  cleanArrays() {
    for (let i = 0; i < this.chartData.length; i++) {
      this.chartData[i] = { y: 0, x: 0 };
      this.chartData.splice(0, this.chartData.length);
    }
  }

  ngAfterViewInit() {
    if (this.canvas) {
      this.canvasElement = this.canvas.nativeElement;
      let ctx = this.canvasElement.getContext('2d');
      this.canvaContext = ctx!!;
      if (!this.canvaContext) {
        return;
      }
    }
    this.canvaContext.fillStyle = '#ffffff';
    this.canvaContext.fillRect(0, 0, this.dimension.width, this.dimension.height);
    const mouseDownStream = fromEvent(this.canvas.nativeElement, 'mousedown');
    const mouseMoveStream = fromEvent(this.canvas.nativeElement, 'mousemove');
    const mouseUpStream = fromEvent(window, 'mouseup');
    mouseDownStream.pipe(map((e) => this.startDraw(e))).subscribe();
    mouseMoveStream.pipe(map((e) => this.keepDraw(e))).subscribe();
    mouseUpStream.pipe(map((e) => this.mouseup(e))).subscribe();
  }
  onClearClick() {
    this.canvaContext.clearRect(0, 0, this.dimension.width, this.dimension.height);
    this.canvaContext.fillStyle = '#ffffff';
    this.canvaContext.fillRect(0, 0, this.dimension.width, this.dimension.height);
  }

  
  onSaveClick() {
    const SignatureOnBase64 = this.canvas.nativeElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.SignatureOnBase64DB = SignatureOnBase64
    this.flagforSpinner=true
    this.getBase64()
    this.testscreen2.modelForinsertTest();
    this.insert() 
    this.onClearClick()
     }
  
  keepDraw(e: any) {
    if (!this.isWriting) return;
    const location = this.getLocation(e);
    this.canvaContext.lineTo(location.X, location.Y);
    this.canvaContext.stroke();
  }
  mouseup(e: any) {
    this.canvas.nativeElement.style.cursor = 'default';
    this.isWriting = false;
  }
  getLocation(e: any) {
    var location = { X: 0, Y: 0 };
    if (e instanceof MouseEvent) {
      location.X = e.offsetX;
      location.Y = e.offsetY;
    } else {
      var dimensions = e.target.getBoundingClientRect();
      location.X = e.touches[0].clientX - dimensions.left;
      location.Y = e.touches[0].clientY - dimensions.top;
    }
    return location;

  }
  startDraw(e: any) {
    this.canvas.nativeElement.style.cursor = 'crosshair';
    this.isWriting = true;
    this.canvaContext.beginPath();
    this.canvaContext.lineCap = 'round';
    this.canvaContext.strokeStyle = 'black';
    this.canvaContext.lineWidth = 2;
    this.canvaContext.lineJoin = 'round';
    const location = this.getLocation(e);
    this.canvaContext.moveTo(location.X, location.Y);
  }
  
getBase64(){
  this.testscreen2.recieveBase64(this.SignatureOnBase64DB);
  this.categories[0].selected = true;
}
saveSignature(mbase64:any){
  const url = window.URL.createObjectURL(mbase64);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', Date.now().toString()+'.pdf');
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

sweetAlert(){
  Swal.fire({
    title: "UPLOAD?",
    text: "'Ready to generate the Test?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm"
  }).then((result) => {
    if (result.isConfirmed) {
    this.onSaveClick()
    this.disabled=true
    this.testscreen2.disable();
    }else{
     this.onClearClick()
    }
  });
}

getDuration() {
  this.testService.getDuration(this.testId).subscribe({
    next: (values) => {
      {
       this.Duration=values.dataResponse
      }
    },
  });



}

}

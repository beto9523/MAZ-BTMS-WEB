import { Component, OnInit } from '@angular/core';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';
import { animate, style, transition, trigger } from '@angular/animations';
import { TestService } from '../../../core/services/test/test.service';
import { totalTestViewModel } from '@ViewModels/test/totalTestViewModel';
import { FilterTestViewModel } from '@ViewModels/test/FilterTestViewModel';
import { FiltrostestComponent } from '../filtrostest/filtrostest.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-totalestest',
  templateUrl: './totalestest.component.html',
  styleUrl: './totalestest.component.css',
  animations: [
    trigger('incremento', [
      transition(':increment', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})



export class TotalestestComponent {

  statusFail:string='-';
  statusPassed:string='-';
  statusCancelled:string='-';
  statusResult:number=0;
  statusCompleted:string='-';

  dummyGetTotals(id:any)
  {
    this.statusFail='3';
    this.statusCancelled='1';
    this.statusCompleted='3';
    this.statusPassed='3';
  }
  
  constructor(
    private testService: TestService
  
  ){
    this.getTotals('');
  }
  
  getTotals( url_params:string){

    this.testService.GetTotals(url_params).subscribe(
      {
        next:(value)=> {          
          this.testTotalsParse(value.dataResponse);
        },
      }
    );

  }
  testTotalsParse(totals:totalTestViewModel){
    this.statusFail= totals.testFailed.toString();
    this.statusCancelled=totals.testCanceled.toString();
    this.statusPassed=totals.testPassed.toString();
    this.statusResult=totals.testTotal;
  }

  initiliazeStatusPassedResult(){
    let finalValue= 10;
    const incrementAmount = 1;
    
    const interval = setInterval(() => {
      if (this.statusResult < finalValue) {
        this.statusResult+=incrementAmount;
      } else {
        clearInterval(interval);
      }
    }, 20);
  }

calculateTotals(filterTestObj:FilterTestViewModel)
{
  
this.getTotals(TestService.setQueryParams(filterTestObj));

}

}


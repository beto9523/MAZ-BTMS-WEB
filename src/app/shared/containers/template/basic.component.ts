import { Component, OnDestroy } from '@angular/core';
import { SignalRService } from '@Services/signalR/signalR.service';
import { correctHeight } from '@Utils/helpers';


@Component({
    selector: 'basic',
    templateUrl: './basic.template.html'
})
export class BasicContainer implements OnDestroy{

  constructor(private signalrService:SignalRService){
    signalrService.startSignalR();


    setTimeout(() => {
      correctHeight();
    }, 1000);

  }

  ngOnDestroy(): void {
    this.signalrService.stopConnection();
  }
}

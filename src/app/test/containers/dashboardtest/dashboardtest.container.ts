import { Component, OnInit, ViewChild } from '@angular/core';
import { TotalestestComponent } from '../../components/totalestest/totalestest.component';
import { FilterTestViewModel } from '@ViewModels/test/FilterTestViewModel';
import { TabletestComponent } from '../../components/tabletest/tabletest.component';
import { FormGroup } from '@angular/forms';
import { TestService } from '@Services/test/test.service';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-dashboardtest',
  templateUrl: './dashboardtest.container.html',
  styleUrl: './dashboardtest.container.css'
})
export class DashboardtestContainer implements OnInit {
  title: string =  'Dashboard tests';

  @ViewChild(TotalestestComponent)totalesComponent!:TotalestestComponent;
  @ViewChild(TabletestComponent)tabletestComponent!:TabletestComponent;

  constructor(private user: UserService){
  }
  ngOnInit(): void {
  }

  showTotalesProcess(filterVM:FilterTestViewModel)
  {
    this.totalesComponent.calculateTotals(filterVM);

    this.tabletestComponent.setTestFilter(filterVM);
  }
}

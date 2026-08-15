import { Component, ViewChild } from '@angular/core';
import { FilterTestViewModel } from '@ViewModels/test/FilterTestViewModel';
import { TabletestmanagmentComponent } from '../../../components/tabletestmanagement/tabletestmanagement/tabletestmanagement.component';

@Component({
  selector: 'app-managementtest',
  templateUrl: './managementtest.container.html',
  styleUrl: './managementtest.container.css'
})
export class ManagementtestContainer {
  @ViewChild(TabletestmanagmentComponent) table!: TabletestmanagmentComponent;
  
  constructor( ){

  }
  FilterTests(filterVM:FilterTestViewModel)
  {
    this.table.setTestFilter(filterVM);
  }
}

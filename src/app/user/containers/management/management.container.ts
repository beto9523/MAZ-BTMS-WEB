import { Component, ViewChild } from '@angular/core';
import { ModalUserComponent } from '../../components/modal-user/modal-user.component';
import { TableUsersComponent } from '../../components/table-users/table-users.component';
import { table } from 'console';

@Component({
  selector: 'container-managment',
  templateUrl: './management.container.html',
  styleUrl: './management.container.css'
})
export class ManagementContainer {
  title: string =  'Users Management';
  @ViewChild(ModalUserComponent) modalUser!: ModalUserComponent;
  @ViewChild(TableUsersComponent) tableUser!: TableUsersComponent;


  constructor(){
  }
  reloadTable(){
    
    this.tableUser.reloadTable();
  }
  addUser(){
    this.modalUser.open();
  }
}

import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCalibrationcertComponent } from '../../components/modal-calibrationcert/modal-calibrationcert.component';
import { TableCalibrationcertComponent } from '../../components/table-calibrationcert/table-calibrationcert.component';

@Component({
  selector: 'app-calibrationcert',
  templateUrl: './calibrationcert.container.html',
  styleUrl: './calibrationcert.container.css'
})
export class CalibrationcertContainer {
  constructor(private modal: NgbModal){
  }
  @ViewChild (ModalCalibrationcertComponent) modalCalib !: ModalCalibrationcertComponent;
  @ViewChild (TableCalibrationcertComponent) tblCalib !: TableCalibrationcertComponent;
  
  title:string="Calibration Certificates";
  reloadTable(){
this.tblCalib.reloadTable();
  }
  openModalNew(){
    this.modalCalib.open("");
  }
}

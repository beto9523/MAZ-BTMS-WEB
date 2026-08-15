import { Component, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserViewModel } from '@ViewModels/users/UserViewModel';
import { TestService } from '../../../core/services/test/test.service';
import { ApipdfService } from '@Services/Report/apipdf.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-viewcert',
  templateUrl: './modal-viewcert.component.html',
  styleUrl: './modal-viewcert.component.css'
})
export class ModalViewcertComponent {
  constructor(
    private modal:NgbModal,
    

    private reporGenerator:ApipdfService
    ,private sanitizer: DomSanitizer
   )
  {

  }
  @ViewChild('content') content: any;
  downloadCert(){

  }
  urlIframe:SafeResourceUrl|undefined ;
  openCertView(mbase64:Blob){
    let strUrl = window.URL.createObjectURL(mbase64);
    this.urlIframe= this.sanitizer.bypassSecurityTrustResourceUrl(strUrl);
  }
  open(idTest?:number) {

    
		let modalRef = this.modal.open(this.content, {
      ariaLabelledBy: 'fuck-modal',
      size: 'lg' ,
      backdrop: 'static',
      keyboard: false }).result.then(
        (result) => {
          return result;
        }
      );
      modalRef.then(
        (result) => {
  
        },
        (reason) => {
  
        }
      ).catch((error) => {
  
      });
     
    this.reporGenerator.Getpdf(idTest!)
    .subscribe({
      next: (e)=>{
        this.openCertView(e.body!);
      },
      error:(err)=>{
        
      }
      
  });    
  }
  }

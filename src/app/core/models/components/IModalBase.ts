import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

export class IModalBase{
    constructor(private modal:NgbModal){
        
    }
    open(content:any):void
    {
        let modalRef = this.modal.open(content, {
            ariaLabelledBy: 'modal',
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
    };
}
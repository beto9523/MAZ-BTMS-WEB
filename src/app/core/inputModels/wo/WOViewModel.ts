import { WorkOrderViewModel } from "@ViewModels/wo/WOViewModel";

export class WorkOrderInputModel{
    woId?: number|null;
    woNumber?: string;
    poNumber: string;
    serial: string;
    descriptionItem: string;
    customerName: string;
    item:string;
    chain : string;
    wll:number|null;
    legs :number|null;
    user: string;
   
    constructor(data?: WorkOrderViewModel) {
      this.woId =data? data.id_pwo:null;
      this.woNumber = data ? data.woNumber: "";
      this.poNumber = data ? data.poNumber: "";
      this.serial = data ? data.serial: "";
      this.descriptionItem = data ? data.descriptionItem: "";
      this.customerName = data ? data.customerName: "";
      this.item = data ? data.item: "";
      this.chain = data ? data.chain:"";
      this.wll = data ? data.wll : null;
      this.legs = data ? data.legs : null;
      this.user =data? data.user :"";
    }
}
   
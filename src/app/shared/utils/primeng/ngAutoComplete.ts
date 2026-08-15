import { JanusResponse } from "@Responses/JanusResponse";
import { CatalogViewModel } from "@ViewModels/shared/CatalogViewModel";
import { ngCtrlDropDownViewModel } from "@ViewModels/TestFilter/ngCtrlDropDownViewModel";
import { ngAutoCompleteOptions } from "./ngAutoCompleteOptions";

export class ngAutoComplete{
    constructor(){

    }
     strFirstOptionControl='Select All';

  setDropDownWithFirstOption(xcatalog: ngCtrlDropDownViewModel[]){
    let f: ngCtrlDropDownViewModel={  value: '', label:this.strFirstOptionControl };
    xcatalog.unshift(f);
    return xcatalog;
  }
  setAutoCompleteWithFirstOption(ctrlName:string, arrOriginal: ngCtrlDropDownViewModel[], arrAux: string[], value:JanusResponse<CatalogViewModel[]>  ){
    
    
  }
  public static Filter(event:any,catalog :  ngAutoCompleteOptions[]=[], catalogAll: ngAutoCompleteOptions[])
  {
    let filtered: ngAutoCompleteOptions[] = [];
    let query= event.query;
    for (let i = 0; i < catalogAll.length; i++) {
      let _SN = catalogAll[i];
      if (_SN.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(_SN);
      }
    }
    return filtered;
  }
  
}
export interface IngAutoComplete{}
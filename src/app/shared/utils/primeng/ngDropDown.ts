import { JanusResponse } from "@Responses/JanusResponse";
import { TestService } from '@Services/test/test.service';
import { CatalogViewModel } from "@ViewModels/shared/CatalogViewModel";
import { ngCtrlDropDownViewModel } from "@ViewModels/TestFilter/ngCtrlDropDownViewModel";
import { map, Observable } from "rxjs";
export interface IngDropDown{

  fillCatalogs(ngdropDown: ngDropDown):void;
}
export class ngDropDown{
    constructor(){
        
    }
     ConvertCatToNgDropDown(xcatalog: CatalogViewModel[]) {
        const arr_type = xcatalog.map((x) => ({
          label: x.value,
          value: x.id,
        }));
        return arr_type;
      }
      /* adentro de los parentesis va la llamada al servicio y el subscribe. y adentro de ese subscribe va la asignacion al modelo
      ctrlList=>{
        this.machines=ctrlList;
       });
    ) */
    fill_ctrl_generic2(cat: Observable<JanusResponse<CatalogViewModel[]>> ):Observable<ngCtrlDropDownViewModel[]>{
        return cat
        .pipe(
          map(value => {
          const dropDown = this.ConvertCatToNgDropDown(value.dataResponse);
          return dropDown;
        })
    
        )
         
      }
}
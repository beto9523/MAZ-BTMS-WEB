import { FormBuilder, FormGroup } from '@angular/forms';
export class ngCalendar{
    public ConverToDateFormat(form:FormGroup, ctrlName:string ){
        let ff=form.controls[ctrlName].value;
    let mdate=new Date(ff);
    //let strDate= this.fechaPipe.transform(mdate,7);
    }
} 
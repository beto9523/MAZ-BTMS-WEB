import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaFormat'
})
export class FechaFormatPipe implements PipeTransform {
  addLeadingZeroToDate(date:number){
    let dateStr:string= (date < 10 ? '0' : '') + date.toString();
    return dateStr;
  }
  transform(value: Date|null, action:number| null ): string|null {


    if(value==null|| value.toString()=='0001-01-01T00:00:00'){
        return null;
    }

    if (value != null) {
       
        let dt:Date =  new Date(value);
       
        let year= this.addLeadingZeroToDate(dt.getFullYear());
        let month= this.addLeadingZeroToDate(dt.getMonth()+1);
        let day= this.addLeadingZeroToDate(dt.getDate());

        let hour= this.addLeadingZeroToDate(dt.getHours());
        let minutes= this.addLeadingZeroToDate(dt.getMinutes());
        let seconds= this.addLeadingZeroToDate(dt.getSeconds());

       
        if (action === 1) {
            return year + "" + month + "" + day + "" + hour + "" + minutes + "" + seconds;
        }
        else if (action === 2) {
            return year + "-" + month + "-" + day + "T" + hour + ":" + minutes + ":" + seconds;
        }
        else if (action === 3) {
            return day + "/" + month + "/" + year
        }
        else if (action === 4) {
            return day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;
        }
        else if (action === 5) {
            return month + "/" + day + "/" + year
        }
        else if (action === 6) {
            return year + "-" + month + "-" + day;
        }
        else if (action === 7) {
            return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
        }
        else {
            return month + "/" + day + "/" + year + " " + hour + ":" + minutes + ":" + seconds;
        }
    }
    else {
        return 'NA'
    }

    /*const fecha = new Date(cadenaFecha);
    const opciones: Intl.DateTimeFormatOptions = {
        day: '2-digit', // 'numeric' para incluir el día sin ceros iniciales
        month: '2-digit',
        year: 'numeric',
        
      };

    return fecha.toLocaleDateString('en-US', opciones);*/
  }
}
#!/usr/bin/env node

const fs = require('fs');

// Obtener el nombre del componente desde la línea de comandos
const componentName = process.argv[2];

if (!componentName) {
  console.error('Error: Debes proporcionar un nombre para el componente.');
  process.exit(1);
}

// Contenido del archivo del componente
const componentContent = `<ng-template #content let-modal >
<div class="modal-header d-flex justify-content-center">
  <h4 class="modal-title" id="user-viewCert"> Edit Test  </h4>
</div>

  <div class="modal-body"  >
    <div class="mb-3">
      <div class="row">
        <form  [formGroup]="form" autocomplete="off"  >
          <div class="row">
            
            <div class="col-md-3  "
           

            >
            <span class="form-title"
            [ngClass]="{ required: this.checkRequired('pwo') }"

            >
            PWO
          
          </span>
              <p-autoComplete
              class="p-inputtext-md"
              [suggestions]="this.pwoOptions"
               
              [forceSelection]="true"
              formControlName="ctrlExample"
              placeholder="select"
              [dropdown]="true"
              (completeMethod)="this.pwoOptions=ngAutoComplete.Filter($event,this.pwoOptions,this.pwoOptionsAll);
              "

              [style]="{ width: '100%', height: '37px', border: '10px' }"
            > 
            </p-autoComplete>
           
              <p class="position-relative">
                <p-message
                  severity="error"
                  *ngIf="
                    form.get('pwo')?.hasError('required') &&
                    form.get('pwo')?.touched
                  "
                  text="PWO is required"
                >
                </p-message>
              </p>
            </div>
          
          </div>
   
            </form>
       </div>
    </div>
  </div>
  <div class="modal-footer">
    <button class="btn btn-primary" type="button" (click)="EditTest()">
     Ok
    </button>
    
    <button
      ngbAutofocus
      type="button"
      class="btn btn-secondary"
      (click)="modal.close('Save click')"
    >
      Cancel
    </button>
  </div>
</ng-template>`;
fs.writeFileSync("${componentName}.component.css", '');
fs.writeSync("${componentName}.component.ts",
`
import { Component, SimpleChanges, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

constructor(private modal:NgbModal
    ,private fb: FormBuilder
    , private Not:NotificationService

)
{
    this.setFormValues();

}
//a pair of arrays are required to manage Autocomplete: one will hold all the options, the other will hold the selected options 
ctrlOptions :  ngAutoCompleteOptions[]=[];
ctrlOptions: ngAutoCompleteOptions[]=[];

filterCtrlOptions(event: any , catalog :  ngAutoCompleteOptions[]=[], catalogAll: ngAutoCompleteOptions[]) {
    //Do this for every control!
    /*we need to assign the global variable from withing the scope of this function
    otherwise angular engine wont detect its value has changed and the ng prime control ll keep
    loading FOREVER. ng zone DOESNT WORK!  */    

    this.CtrlOptions= ngAutoComplete.Filter(event,catalog,catalogAll);
    
    
  }

setFormValues() {
    this.form = this.fb.group({
      //id:  ['',  [Validators.required]],
    });

    this.serialNumbers=[]

  }
open(id?:number) {

  if(id!=null){  
    //this.getById(id!);
  }
    let modalRef = this.modal.open(this.content, {
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
   
  

}
}`
)
// Escribir el contenido en el archivo del componente
fs.writeFile(`${componentName}.component.html`, componentContent, (err) => {
  if (err) {
    console.error(`Error al escribir el archivo ${componentName}.component.html: ${err}`);
    process.exit(1);
  }
  console.log(`Archivo ${componentName}.component.html generado exitosamente.`);
})
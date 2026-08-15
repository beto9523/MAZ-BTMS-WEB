import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import {  ListboxModule } from 'primeng/listbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';

@NgModule({
  declarations: [],
  imports: [
    DropdownModule,
    AutoCompleteModule,
    ListboxModule,


    InputTextModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    InputSwitchModule,
    RadioButtonModule,
    CheckboxModule,
    CalendarModule,
    FileUploadModule,
    InputTextareaModule
    ,InputNumberModule
  ],
  exports: [
    DropdownModule,
    ListboxModule,
    AutoCompleteModule,
    
    InputTextModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    InputSwitchModule,
    RadioButtonModule,
    CheckboxModule,
    CalendarModule
    ,FileUploadModule
    ,InputTextareaModule
    ,InputNumberModule

  ]
})
export class PrimeNGModule { }

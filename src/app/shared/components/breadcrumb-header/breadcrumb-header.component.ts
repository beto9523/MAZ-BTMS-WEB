import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-header',
  templateUrl: './breadcrumb-header.component.html',
  styleUrl: './breadcrumb-header.component.css'
})
export class BreadcrumbHeaderComponent {
@Input()title:string='';
}

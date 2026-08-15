import { Component } from '@angular/core';

@Component({
    selector: 'footer',
    templateUrl: './footer.template.html'
})
export class FooterComponent {
  year: number = new Date().getFullYear();
 }

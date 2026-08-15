import { Directive, ElementRef, Renderer2, OnInit, Input, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Directive({
  selector: '[tooltip]',
  standalone: false,
})
export class TooltipDirective implements OnInit,OnChanges {
  @Input() value: string = '';
  constructor(private el: ElementRef, private renderer: Renderer2, private tooltip: NgbTooltip) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.value?.length>0){
      const element = this.el.nativeElement;
      const maxCharacters = 20;      
      if (this.value.length > maxCharacters) {
        const truncatedText = this.value.substring(0, maxCharacters - 3) + '...';
        element.innerText = truncatedText;
        this.tooltip.open(element); // Abrir el tooltip al pasar el mouse
        this.tooltip.ngbTooltip = this.value; // Configurar el texto completo en el tooltip

      }
      else{
        this.renderer.setProperty(element, 'textContent', this.value);
      }
    }
    
  }
  ngOnInit() {

  }

}

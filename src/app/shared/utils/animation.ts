// fade-in-out.animation.ts
import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInOutAnimation =
  trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('200ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('200ms', style({ opacity: 0 }))
    ])
  ]);

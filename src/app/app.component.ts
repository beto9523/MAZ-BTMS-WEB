import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {correctHeight,detectBody,smoothlyMenu,
} from './shared/utils/helpers';
import { SpinnerService } from './core/services/spinner/spinner.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'MAZZELLA Lifting';
  loading: boolean = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private spinner: SpinnerService
  ) {}

  ngOnInit() {
    this.spinner.isLoading.subscribe((value: boolean) => {
      this.loading = value;
    });
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('load', () => {
        correctHeight();
        detectBody();
        smoothlyMenu();
      });

      window.addEventListener('resize', () => {
        correctHeight();
        detectBody();
        smoothlyMenu();
      });
    }
  }
}

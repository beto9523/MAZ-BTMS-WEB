import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title?: string, fast?: boolean) {
    this.toastr.success(message, title,{
      progressBar : true,
      timeOut: fast == true ? 1000: 5000,
    });
  }

  showFormError(){
    this.toastr.error('Please ensure all fields are filled out', 'Form Validation',{
      progressBar : true,
      timeOut: 3000,
      newestOnTop: true,
      closeButton: false
    });
  }

  showError(message: string, title?: string) {

    this.toastr.error(message, title,{
      progressBar : true,
      timeOut: 5000,
      newestOnTop: true,
      closeButton: false,

    });

  }

  showWarning(message: string, title?: string) {
    this.toastr.warning(message, title);
  }

  showInfo(message: string, title?: string) {
    this.toastr.info(message, title,{
      progressBar : true,
      timeOut: 5000,
      newestOnTop: true,
      closeButton: false,

    });
  }
}

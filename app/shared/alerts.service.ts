import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor() {}

  sweetAlert: any = swal;
  private spinnerService = inject(NgxSpinnerService);

  genericAlertMsg(swalTitle: string, swalText: string, swalIcon: string) {
    this.sweetAlert.fire({
      title: swalTitle,
      text: swalText,
      icon: swalIcon,
      focusConfirm: false,
      confirmButtonText: 'OK',
      showCloseButton: false,
      showCancelButton: false,
      allowOutsideClick: false,
    });
  }

  confirmationAlert(
    swalTitle: string,
    swalText: string,
    swalIcon: string,
    swalbtnText: string,
    btnCancel?: boolean,
    btnCancelTxt?: string
  ): Promise<{
    isConfirmed: boolean;
    isDenied: boolean;
    isDismissed: boolean;
    dismiss: string;
  }> {
    if (btnCancel)
      return this.sweetAlert.fire({
        title: swalTitle,
        text: swalText,
        icon: swalIcon,
        showCancelButton: true,
        confirmButtonText: swalbtnText,
        cancelButtonText: btnCancelTxt,
        allowOutsideClick: false,
      });
    return this.sweetAlert.fire({
      title: swalTitle,
      text: swalText,
      icon: swalIcon,
      confirmButtonText: swalbtnText,
      allowOutsideClick: false,
    });
  }

  showSpinner() {
    this.spinnerService.show();
  }

  stopSpinner() {
    this.spinnerService.hide();
  }
}

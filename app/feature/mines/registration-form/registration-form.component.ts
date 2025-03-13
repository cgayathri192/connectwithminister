import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { AlertsService } from 'src/app/shared';

declare var bootstrap: any;

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  fileToUpload: File | null = null;
  fileError: string = '';
  otpForm: FormGroup;
  otpError: string = '';
  verificationCode: string = '';
  isOtpVerified: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertsService
  ) {
    this.registrationForm = this.formBuilder.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      aadharNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{12}$')],
      ],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      address: ['', [Validators.required]],
      representation: ['', [Validators.required, Validators.maxLength(1000)]],
      fileUpload: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.otpForm = this.formBuilder.group({
      otp1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp5: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp6: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
    });

  }

  onSubmit(): void {
    if (this.registrationForm.valid && this.fileToUpload) {
      const payload = {
        name: this.registrationForm.value.fullName,
        aadharNumber: this.registrationForm.value.aadharNumber,
        mobileNumber: this.registrationForm.value.mobileNumber,
        address: this.registrationForm.value.address,
        breifOfRepresentation: this.registrationForm.value.representation,
        email: this.registrationForm.value.email
      };

      const formData = new FormData();
      formData.append('minesAndGeology', JSON.stringify(payload));
      formData.append('minesDocument', this.fileToUpload);

      let minesId = '';
      this.alertService.showSpinner();
      this.apiService
        .serverPost<FormData, any>('mines/addData', formData)
        .subscribe({
          next: (response) => {
            this.alertService.stopSpinner();
            if (response?.minesId !== '') {
              minesId = response?.minesId;
              console.log('minesId:::::' + minesId);
            }
            this.alertService.genericAlertMsg(
              '',
              `Form Submitted successfully ${response.minesId}`,
              'success'
            );
            console.log('API Response:', response);
            this.registrationForm.reset();
            this.fileToUpload = null;
            this.fileError = '';
            const fileInput = document.getElementById(
              'fileInput'
            ) as HTMLInputElement;
            if (fileInput) {
              fileInput.value = '';
            }
          },
          error: (error) => {
            console.error('Error:', error);
            this.alertService.stopSpinner();
            this.alertService.genericAlertMsg(
              '',
              'Request processing error',
              'info'
            );
          },
        });
    } else {
      this.alertService.stopSpinner();
      this.registrationForm.markAllAsTouched();
      if (!this.fileToUpload) {
        this.fileError = 'File is required.';
      }
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const isPDF = file.type === 'application/pdf';
      const isValidSize = file.size <= 2 * 1024 * 1024;

      if (!isPDF) {
        this.fileError = 'Only PDF files are allowed.';
        this.fileToUpload = null;
        return;
      }

      if (!isValidSize) {
        this.fileError = 'File size must be less than 2 MB.';
        this.fileToUpload = null;
        return;
      }

      this.fileError = '';
      this.fileToUpload = file;
      this.registrationForm.patchValue({
        fileUpload: file,
      });
    }
  }

  onAadharInput(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.registrationForm.controls['aadharNumber'].setValue(input.value);
  }

  onMobileInput(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.registrationForm.controls['mobileNumber'].setValue(input.value);
  }

  get formControls() {
    return this.registrationForm.controls;
  }
  openOtpModal() {
    const otpModal = new bootstrap.Modal(document.getElementById('otpModal'));
    otpModal.show();

  }

  onOtpInput(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1) {
      const nextSibling = input.nextElementSibling as HTMLInputElement;
      if (nextSibling) {
        nextSibling.focus();
      }
    }

  }

  verifyOtp() {
    const otpArray = [
      this.otpForm.get('otp1')?.value,
      this.otpForm.get('otp2')?.value,
      this.otpForm.get('otp3')?.value,
      this.otpForm.get('otp4')?.value,
      this.otpForm.get('otp5')?.value,
      this.otpForm.get('otp6')?.value,
    ];

    const otp = otpArray.join('');

    const email = this.registrationForm.get('email')?.value;

    if (otp.length === 6 && email) {
      this.alertService.showSpinner();
      const apiUrl = `email/verficationCode?email=${email}&verificationCode=${otp}`;

      this.apiService.updatePost<any, any>(apiUrl, '').subscribe({
        next: (response) => {
          this.alertService.stopSpinner();
          if (response?.status === 200 && response?.error === false) {
            this.alertService.genericAlertMsg('', 'OTP verification successful!', 'success');
            this.isOtpVerified = true;
            const otpModal = bootstrap.Modal.getInstance(document.getElementById('otpModal'));
            if (otpModal) otpModal.hide();
          } else {
            this.alertService.genericAlertMsg('', 'Invalid OTP. Please try again.', 'danger');
          }
        },
        error: (error) => {
          this.alertService.stopSpinner();
          this.alertService.genericAlertMsg('', 'Error verifying OTP', 'danger');
          console.error('OTP Verification Error:', error);
        }
      });
    } else {
      this.otpError = 'Please enter a valid OTP.';
      this.alertService.stopSpinner();
    }
  }


  SendOtp() {
    const email = this.registrationForm.get('email')?.value;

    if (this.registrationForm.get('email')?.valid) {
      this.alertService.showSpinner();
      const apiUrl = `email/emailVerfication?email=${email}`;

      this.apiService.updatePost<any, any>(apiUrl, '').subscribe({
        next: (response) => {
          this.alertService.stopSpinner();

          if (response?.status === 200 && response?.error === false) {
            this.alertService.genericAlertMsg('', response?.data || 'Verification code has been successfully sent!', 'success');

            this.openOtpModal();
          } else {
            this.alertService.genericAlertMsg('', 'Failed to send OTP', 'danger');
          }
        },
        error: (error) => {
          this.alertService.stopSpinner();
          this.alertService.genericAlertMsg('', 'Error sending OTP', 'danger');
          console.error('OTP Send Error:', error);
        }
      });
    } else {
      this.registrationForm.get('email')?.markAsTouched();
    }
  }



}




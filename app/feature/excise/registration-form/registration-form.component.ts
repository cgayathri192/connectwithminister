import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { AlertsService } from 'src/app/shared';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string = '';

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
          Validators.minLength(3),
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
      representation: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ],
      ],
      fileUpload: [null],
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const excisePayload = {
        name: this.registrationForm.value.fullName,
        aadharNumber: this.registrationForm.value.aadharNumber,
        mobileNumber: this.registrationForm.value.mobileNumber,
        address: this.registrationForm.value.address,
        breifOfRepresentation: this.registrationForm.value.representation,
      };

      const formData = new FormData();
      formData.append('excise', JSON.stringify(excisePayload));

      if (this.selectedFile) {
        formData.append('exciseDocument', this.selectedFile);
      }

      let exciseId = '';
      this.alertService.showSpinner();
      this.apiService
        .serverPost<FormData, any>('excise/addData', formData)
        .subscribe({
          next: (response) => {
            this.alertService.stopSpinner();
            if (response?.exciseId !== '') {
              exciseId = response?.exciseId;
              console.log('exciseId:::::' + exciseId);
            }
            this.alertService.genericAlertMsg(
              '',
              `Form Submitted successfully ${response.id}`,
              'success'
            );
            this.resetForm();
          },
          error: (error) => {
            this.alertService.stopSpinner();

            this.alertService.genericAlertMsg(
              '',
              'Request processing error',
              'info'
            );
            console.error('Error occurred:', error);
          },
        });
    } else {
      this.alertService.stopSpinner();
      this.registrationForm.markAllAsTouched();
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const isPDF = file.type === 'application/pdf';
      const isValidSize = file.size <= 2 * 1024 * 1024;

      if (!isPDF) {
        this.fileError = 'Only PDF files are allowed.';
        this.selectedFile = null;
        return;
      }

      if (!isValidSize) {
        this.fileError = 'File size must be less than 2 MB.';
        this.selectedFile = null;
        return;
      }

      this.fileError = '';
      this.selectedFile = file;
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

  private resetForm(): void {
    this.registrationForm.reset();
    this.selectedFile = null;
    this.fileError = '';

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  get formControls() {
    return this.registrationForm.controls;
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { AlertsService } from 'src/app/shared';

@Component({
  selector: 'app-mines-meeting-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mines-meeting-form.component.html',
  styleUrls: ['./mines-meeting-form.component.scss'],
})
export class MinesMeetingFormComponent {
  meetingForm!: FormGroup;
  selectedFile!: File | null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      modeOfCategory: [
        { value: 'Mines & Geology', disabled: true },
        Validators.required,
      ],
      modeOfAppointment: ['', Validators.required],
      priorityOfMeeting: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('[0-9]{10}')],
      ],
      meetingStart: ['', Validators.required],
      meetingEnd: ['', Validators.required],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      meetingAgenda: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ],
      ],
      file: [null, [Validators.required]],
    });
  }
  getMinEndDate() {
    return new Date().toISOString().split('T')[0];
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / 1024 / 1024;
      const fileType = file.type;

      if (fileType !== 'application/pdf') {
        this.meetingForm.controls['file'].setErrors({ invalidType: true });
      } else if (fileSizeInMB > 2) {
        this.meetingForm.controls['file'].setErrors({ fileSizeExceeded: true });
      } else {
        this.selectedFile = file;
        this.meetingForm.controls['file'].setErrors(null);
      }
    }
  }
  onSubmit() {
    if (this.meetingForm.valid && this.selectedFile) {
      const formData = new FormData();

      formData.append(
        'meetingSchedule',
        JSON.stringify(this.meetingForm.getRawValue())
      );
      formData.append('meetingDocument', this.selectedFile);
      this.alertService.showSpinner();
      this.apiService.serverPost('meeting/addData', formData).subscribe({
        next: (response) => {
          this.alertService.stopSpinner();
          this.alertService.genericAlertMsg(
            '',
            'Meeting Schedule submitted successfully!',
            'success'
          );
          this.meetingForm.reset();
          this.selectedFile = null;
        },
        error: (err) => {
          console.error('Failed to submit Meeting Schedule:', err);
          this.alertService.stopSpinner();
          this.alertService.genericAlertMsg(
            '',
            'Failed to submit Meeting Schedule. Please try again.',
            'error'
          );
        },
      });
    } else {
      console.log('Form is invalid');
      this.alertService.stopSpinner();
      this.alertService.genericAlertMsg(
        '',
        'Please fill all required fields correctly before submitting.',
        'warning'
      );
      this.meetingForm.markAllAsTouched();
    }
  }
}

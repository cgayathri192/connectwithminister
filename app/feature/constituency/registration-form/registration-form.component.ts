import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { AlertsService } from 'src/app/shared';

@Component({
  selector: 'app-constituency-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  fileError: string = '';
  selectedFile: File | null = null;

  constituencies: string[] = ['Vijayawada', 'Guntur', 'Nellore'];
  mandals: { [key: string]: string[] } = {
    Vijayawada: ['Ibrahimpatnam', 'Kanchikacherla', 'Mylavaram'],
    Guntur: ['Tenali', 'Mangalagiri', 'Amaravathi'],
    Nellore: ['Sullurpeta', 'Gudur', 'Venkatagiri'],
  };
  villages: { [key: string]: string[] } = {
    Ibrahimpatnam: ['Gollapudi', 'Ibrahimpatnam', 'Kondapalli'],
    Kanchikacherla: ['Keesara', 'Kanchikacherla', 'Velvadam'],
    Mylavaram: ['Mylavaram', 'G.Konduru', 'Velvadam'],
    Tenali: ['Angalakuduru', 'Tenali', 'Chilumuru'],
    Mangalagiri: ['Nidamarru', 'Mangalagiri', 'Atmakur'],
    Amaravathi: ['Amaravathi', 'Pedakurapadu', 'Velagapudi'],
    Sullurpeta: ['Sullurpeta', 'Chillakur', 'Naidupeta'],
    Gudur: ['Kavali', 'Gudur', 'Ongole'],
    Venkatagiri: ['Venkatagiri', 'Balayapalli', 'Rapur'],
  };

  filteredMandals: string[] = [];
  filteredVillages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertsService
  ) {
    this.registrationForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]+$'),
          Validators.maxLength(50),
        ],
      ],
      constituency: [
        { value: 'Machilipatnam', disabled: true },
        Validators.required,
      ],
      mandal: ['', [Validators.required]],
      urban: ['', [Validators.required]],
      // issue: ['', [Validators.required]],
      urbanIssue: [''],
      ruralIssue: [''],
      village: ['', [Validators.required]],
      gender: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      aadhar: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      fileUpload: [null],
      meetingAgenda: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ],
      ],
      division: [''],
    });
  }

  mandalList = [
    'Avanigadda',
    'Bantumilli',
    'Challapalli',
    'Ghantasala',
    'Guduru',
    'Koduru',
    'Kruthivennu',
    'Machilipatnam North',
    'Machilipatnam South',
    'Mopidevi',
    'Nagayalanka',
    'Pedana',
  ];

  // onConstituencyChange(event: any): void {
  //   const selectedConstituency = event.target.value;
  //   this.filteredMandals = this.mandals[selectedConstituency] || [];
  //   this.filteredVillages = [];
  //   this.registrationForm.patchValue({ mandal: '', village: '' });
  // }

  // onMandalChange(event: any): void {
  //   const selectedMandal = event.target.value;
  //   this.filteredVillages = this.villages[selectedMandal] || [];
  //   this.registrationForm.patchValue({ village: '' });
  // }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = new FormData();

      const payload = {
        name: this.registrationForm.get('name')?.value,
        aadharNumber: this.registrationForm.get('aadhar')?.value,
        mobileNumber: this.registrationForm.get('mobile')?.value,
        constituency: this.registrationForm.get('constituency')?.value,
        mandal: this.registrationForm.get('mandal')?.value,
        village: this.registrationForm.get('village')?.value,
        gender: this.registrationForm.get('gender')?.value,
        meetingAgenda: this.registrationForm.get('meetingAgenda')?.value,
        division: this.registrationForm.get('urban')?.value,
        issue:
          this.registrationForm.value.urban === 'urban'
            ? this.registrationForm.get('urbanIssue')?.value
            : this.registrationForm.get('ruralIssue')?.value,
      };

      const jsonPayload = JSON.stringify(payload);

      console.log('jsonpayload' + jsonPayload);
      formData.append('constituency', jsonPayload);
      if (this.selectedFile) {
        formData.append('constituencyDocument', this.selectedFile);
      }
      let constituencyId = '';
      this.alertService.showSpinner();
      this.apiService
        .serverPost<FormData, any>('constituency/addData', formData)
        .subscribe({
          next: (response) => {
            this.alertService.stopSpinner();
            if (response?.constituencyId !== '') {
              constituencyId = response?.constituencyId;
              console.log('constituencyId:::::' + constituencyId);
            }
            this.alertService.genericAlertMsg(
              '',
              `Form Submitted successfully ${response.constituencyId}`,
              'success'
            );
            this.resetForm();
          },
          error: (error) => {
            console.error('Form Submission Error', error);
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

      console.log('Form is invalid');
    }
  }

  onAadharInput(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.registrationForm.controls['aadhar'].setValue(input.value);
  }

  onMobileInput(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.registrationForm.controls['mobile'].setValue(input.value);
  }

  resetValidaors(event: Event) {
    let selectedValue = (event.target as HTMLSelectElement).value;

    // const urbanIssueControl = this.registrationForm.get('urbanIssue');
    // const ruralIssueControl = this.registrationForm.get('ruralIssue');

    // if (selectedValue === 'urban') {
    //   this.registrationForm.get('division')?.setValue('Urban');
    //   urbanIssueControl?.setValidators([Validators.required]);
    //   ruralIssueControl?.clearValidators();
    // } else if (selectedValue === 'rural') {
    //   this.registrationForm.get('division')?.setValue('Rural');
    //   ruralIssueControl?.setValidators([Validators.required]);
    //   urbanIssueControl?.clearValidators();
    // } else {
    //   urbanIssueControl?.clearValidators();
    //   ruralIssueControl?.clearValidators();
    // }

    // urbanIssueControl?.updateValueAndValidity();
    // ruralIssueControl?.updateValueAndValidity();

    if (selectedValue === 'urban') {
      // urbanIssue:
      // ruralIssue
      this.registrationForm.controls['urbanIssue'].setValidators([
        Validators.required,
      ]);
      this.registrationForm.controls['ruralIssue'].clearValidators();
      this.registrationForm.updateValueAndValidity();
    } else if (selectedValue === 'rural') {
      this.registrationForm.controls['ruralIssue'].setValidators([
        Validators.required,
      ]);
      this.registrationForm.controls['urbanIssue'].clearValidators();
      this.registrationForm.updateValueAndValidity();
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

  private resetForm(): void {
    this.registrationForm.reset();
    this.selectedFile = null;
    this.fileError = '';

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}

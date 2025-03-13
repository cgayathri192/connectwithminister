import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/api.service';
import { CONST_DATA_BY_ID, ConstituencyData } from 'src/app/app.model';
import { API_CONST } from 'src/app/core/constants/api.constant';
import { ExcelService } from '../../excel.service';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AlertsService } from '../../alerts.service';

@Component({
  selector: 'app-const-reg-dash',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './const-reg-dash.component.html',
  styleUrls: ['./const-reg-dash.component.scss'],
})
export class ConstRegDashComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private excelService: ExcelService,
    private alertService: AlertsService
  ) {}

  scheduleData: ConstituencyData[] = [];
  filteredData: ConstituencyData[] = [];
  paginatedData: ConstituencyData[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;
  activeStatusFilter = '';

  ngOnInit(): void {
    this.constDashList('overAll', 'overAll', 'overAll');
    this.emailAdd();
  }

  updatePaginatedData() {
    const startItem = (this.currentPage - 1) * this.itemsPerPage;
    const endItem = this.currentPage * this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(startItem, endItem);
  }

  filterByStatus(status: any) {
    const selectedStatus = status.target.value;
    console.log('Selected Status:', selectedStatus);
    this.activeStatusFilter = selectedStatus;

    if (this.activeStatusFilter) {
      this.filteredData = this.scheduleData.filter(
        (item) => item.status === this.activeStatusFilter
      );
    } else {
      this.filteredData = [...this.scheduleData];
    }

    this.totalItems = this.filteredData.length;
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  nextPage() {
    if (this.canGoNext()) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  prevPage() {
    if (this.canGoPrev()) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  canGoNext(): boolean {
    return this.currentPage < this.getTotalPages();
  }

  canGoPrev(): boolean {
    return this.currentPage > 1;
  }

  selectedDate: string = 'overAll';
  selectedStatus: string = 'overAll';
  selectedIssue: string = 'overAll';

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;

    if (target.type === 'date') {
      this.selectedDate = target.value || 'overAll';
    } else if (target.id === 'status') {
      this.selectedStatus = target.value || 'overAll';
    } else if (target.id === 'issue') {
      this.selectedIssue = target.value || 'overAll';
    }

    this.constDashList(
      this.selectedDate,
      this.selectedStatus,
      this.selectedIssue
    );
  }

  constituencyList: ConstituencyData[] = [];

  constDashList(createdDate: string, status: string, issue: string) {
    //let url = `constituency/dasboardList?createdDate=2024-09-13&status=Processing`;
    // let status = event?.target?.value || 'Processing';

    // if (!status) {
    //   status = 'Processing';
    // }

    let url = `${API_CONST['CONSTITUENCY']}/${API_CONST['DASBOARD_LIST']}?createdDate=${createdDate}&status=${status}&issue=${issue}`;
    this.alertService.showSpinner();
    this.apiService.serverGet<any>(url).subscribe({
      next: (res) => {
        this.alertService.stopSpinner();
        this.constituencyList = res.listofData;
        console.log(this.constituencyList);
        this.scheduleData = [...this.constituencyList];
        this.filteredData = [...this.scheduleData];
        this.totalItems = this.scheduleData.length;
        this.currentPage = 1;
        console.log(this.totalItems);
        this.updatePaginatedData();
      },
      error: (err) => {
        this.alertService.stopSpinner();
        console.error('Error fetching dashboard list:', err);
      },
      complete: () => {
        this.alertService.stopSpinner();

        console.log('Request completed');
      },
    });
  }
  constDataById: CONST_DATA_BY_ID | null = null;
  constGetDataById(id: string) {
    let url = `${API_CONST['CONSTITUENCY']}/${API_CONST['CONST_BY_ID']}/${id}`;

    this.apiService.serverGet<CONST_DATA_BY_ID>(url).subscribe({
      next: (res: CONST_DATA_BY_ID) => {
        console.log(res);
        this.constDataById = res;
      },
      error: (err) => {
        console.log('error::::::' + err);
      },
      complete: () => {
        console.log('API request completed.');
      },
    });
  }

  downLoadPdfFile(fileType: any, fileData: any, fileName: any) {
    let extension = fileType.split('/');
    const link = document.createElement('a');
    link.setAttribute('href', `data:${fileType};base64,` + fileData);
    link.setAttribute('download', `${fileName}.${extension[1]}`);
    link.click();
  }
  downloadExcel() {
    this.excelService.generateConstituencyExcel(
      this.constituencyList,
      'Constituency Data'
    );
  }

  mainForm: UntypedFormGroup = this.fb.group({});
  emailAdd() {
    this.mainForm = this.fb.group({
      status: ['', [Validators.required]],
      emailArray: this.fb.array([]),
      newEmail: ['', [Validators.required, Validators.email]],
    });
  }

  addEmail() {
    if (this.newEmailFc.valid) {
      let emailGroup = this.fb.group({
        newEmail: [this.newEmailFc.value],
      });

      this.emailArrayFa.push(emailGroup);

      this.mainForm.controls['newEmail'].reset();

      console.log(this.emailArrayFa.value);
    } else {
      console.log('Invalid email, please enter a valid one.');
    }
  }

  removeEmail(i: number) {
    this.emailArrayFa.removeAt(i);
  }

  get emailArrayFa() {
    return this.mainForm.controls['emailArray'] as UntypedFormArray;
  }

  get newEmailFc() {
    return this.mainForm.controls['newEmail'] as UntypedFormGroup;
  }
  saveChanges() {
    const status = this.mainForm.get('status')?.value;

    const emails = this.emailArrayFa.value.map(
      (emailGroup: any) => emailGroup.newEmail
    );
    const constituencyId = this.constDataById?.constituencyId;

    if (!constituencyId || !status || emails.length === 0) {
      console.error('Missing data for the update.');
      return;
    }

    const payload = {
      category: 'Constituency',
      status: status,
      id: constituencyId,
      email: emails,
    };

    this.alertService.showSpinner();
    const url = `${API_CONST['UPDATE_STATUS']}`;
    this.alertService.showSpinner();
    this.apiService.updatePost<any, any>(url, payload).subscribe({
      next: (response) => {
        console.log('response:' + JSON.stringify(response));
        console.log('response:' + JSON.stringify(response.status));

        this.alertService.stopSpinner();
        this.alertService.genericAlertMsg(
          '',
          'Updated Successfully',
          'success'
        );
        console.log('Changes saved successfully:', response);
        this.mainForm.reset();
        this.emailArrayFa.clear();
        (document.getElementById('statusDropdown') as HTMLSelectElement).value =
          '';
      },
      error: (err) => {
        this.alertService.stopSpinner();
        this.alertService.genericAlertMsg(
          '',
          'Request Processing Error...',
          'info'
        );
        console.error('Request Processing Error...', err);
      },
      complete: () => {
        console.log('API request to save changes completed.');
        this.alertService.stopSpinner();
      },
    });
  }
}

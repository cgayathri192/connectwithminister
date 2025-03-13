import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/api.service';
import { MINES_DATA_BY_ID, MinesData } from 'src/app/app.model';
import { API_CONST } from 'src/app/core/constants/api.constant';
import { ExcelService } from '../../excel.service';
import { AlertsService } from '../../alerts.service';
import {
  UntypedFormGroup,
  Validators,
  UntypedFormArray,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-mines-reg-dash',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mines-reg-dash.component.html',
  styleUrls: ['./mines-reg-dash.component.scss'],
})
export class MinesRegDashComponent {
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private excelService: ExcelService,
    private alertService: AlertsService
  ) {}

  scheduleData: MinesData[] = [];
  filteredData: MinesData[] = [];
  paginatedData: MinesData[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;
  activeStatusFilter = '';

  ngOnInit(): void {
    this.minesDashList('overAll', 'overAll');
    //this.minesGetDataById('MG2');
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

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;

    if (target.type === 'date') {
      this.selectedDate = target.value || 'overAll';
    } else if (target.tagName === 'SELECT') {
      this.selectedStatus = target.value || 'overAll';
    }

    this.minesDashList(this.selectedDate, this.selectedStatus);
  }

  minesList: MinesData[] = [];

  minesDashList(createdDate: string, status: any) {
    //let url = `constituency/dasboardList?createdDate=2024-09-13&status=Processing`;
    // let status = event?.target?.value || 'Processing';
    // if (!status) {
    //   status = 'Processing';
    // }

    let url = `${API_CONST['MINES']}/${API_CONST['DASBOARD_LIST']}?createdDate=${createdDate}&status=${status}`;
    this.alertService.showSpinner();
    this.apiService.serverGet<any>(url).subscribe({
      next: (res) => {
        this.alertService.stopSpinner();
        this.minesList = res.listofData;
        console.log(this.minesList);
        this.scheduleData = [...this.minesList];
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
  minesDataById: MINES_DATA_BY_ID | null = null;
  minesGetDataById(id: string) {
    let url = `${API_CONST['MINES']}/${API_CONST['MINES_BY_ID']}/${id}`;

    this.alertService.showSpinner();
    this.apiService.serverGet<MINES_DATA_BY_ID>(url).subscribe({
      next: (res: MINES_DATA_BY_ID) => {
        this.alertService.stopSpinner();

        console.log(res);
        this.minesDataById = res;
      },
      error: (err) => {
        this.alertService.stopSpinner();
        console.log('error::::::' + err);
      },
      complete: () => {
        this.alertService.stopSpinner();
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
    this.excelService.genMinesExcelFile(this.minesList);
  }

  minesForm: UntypedFormGroup = this.fb.group({});
  emailAdd() {
    this.minesForm = this.fb.group({
      minesstatus: ['', [Validators.required]],
      emailArray: this.fb.array([]),
      minesemail: ['', [Validators.required, Validators.email]],
    });
  }

  get emailArrayFa() {
    return this.minesForm.controls['emailArray'] as UntypedFormArray;
  }

  get newEmailFc() {
    return this.minesForm.controls['minesemail'] as UntypedFormGroup;
  }

  minesAddEmail() {
    console.log('minesAddEmail');
    if (this.newEmailFc.valid) {
      let emailGroup = this.fb.group({
        minesemail: [this.newEmailFc.value],
      });

      this.emailArrayFa.push(emailGroup);

      this.minesForm.controls['minesemail'].reset();

      console.log(this.emailArrayFa.value);
    } else {
      console.log('Invalid email, please enter a valid one.');
    }
  }

  removeEmail(i: number) {
    this.emailArrayFa.removeAt(i);
  }

  saveChanges() {
    const status = this.minesForm.get('minesstatus')?.value;

    const emails = this.emailArrayFa.value.map(
      (emailGroup: any) => emailGroup.minesemail
    );
    const minesId = this.minesDataById?.minesId;

    if (!minesId || !status || emails.length === 0) {
      console.error('Missing data for the update.');
      return;
    }

    const payload = {
      category: 'MinesAndGeology',
      status: status,
      id: minesId,
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
        this.resetmodalAction();
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

  resetmodalAction() {
    this.minesForm.reset();
    this.emailArrayFa.clear();
    (document.getElementById('statusDropdown') as HTMLSelectElement).value = '';
  }
}

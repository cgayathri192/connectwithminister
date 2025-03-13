import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  serverGet<R>(url: string) {
    return this.http.get<R>(environment.SERVER + url);
  }

  serverPost<T, R>(url: string, body: FormData) {
    return this.http.post<R>(environment.SERVER + url, body);
  }

  updatePost<T, R>(url: string, body: T) {
    return this.http.post<R>(environment.SERVER + url, body);
  }
}

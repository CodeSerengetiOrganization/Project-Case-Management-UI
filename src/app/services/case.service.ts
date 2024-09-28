import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CaseNew as CaseDetails } from '../dar/case-detail/case-detail.component';
import { CaseDetail } from '../dar/case-detail/case-detail.component';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private apiUrl = environment.apiUrl;
  // constructor() { }

  constructor(private http: HttpClient) { }

  getCaseById(caseId: number) : Observable<CaseDetail> {
    return this.http.get<CaseDetail>(`${this.apiUrl}/${caseId}`);
  }

}

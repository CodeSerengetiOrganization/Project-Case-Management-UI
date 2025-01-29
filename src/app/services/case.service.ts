import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
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
    return this.http.get<CaseDetail>(`${this.apiUrl}/${caseId}`).pipe(
      catchError((error) => this.handleError("worflowA",caseId,error))
    );
  }

  private handleError(workflow: string, caseId: number, error: any){
    let errorMessage = `Error retrieve ${workflow} case details for case ID: ${caseId}.`;
    if (error.status === 400) {
      errorMessage += 'Bad Request: Invalid input or parameters';      
    } else if (error.status === 404) {
      errorMessage += 'Not Found: The requested case does not exist, case id:'+caseId;
    } else if (error.status === 500) {
      errorMessage += 'Internal Server Error: something wrong with the server';
    }else{
      errorMessage += 'An unexpected error occured.';
    }
    console.error(errorMessage,error);
    return throwError(() => new Error(errorMessage));
  }

}

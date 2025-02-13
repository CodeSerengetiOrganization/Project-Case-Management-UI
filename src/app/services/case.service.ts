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
  getapiUrl() : string{
      return this.apiUrl;
  }
  // constructor() { }

  constructor(private http: HttpClient) { }

  getCaseById(caseId: number) : Observable<CaseDetail> {
    return this.http.get<CaseDetail>(`${this.apiUrl}/${caseId}`).pipe(
      catchError((error) => this.handleError("worflowA",caseId,error))
    );
  }

  private handleError(workflow: string, caseId: number, errorResponse: any){
    // console.log(errorResponse);
    let errorMessage = `Error retrieve ${workflow} case details for case ID: ${caseId}.`;
/*     if(errorResponse){
      if(errorResponse.error){
        console.log('errorResponse.error is here:',errorResponse.error);
        console.log('try to get errorResponse.error.error:',errorResponse.error.error);
        if(errorResponse.error.error.errorCode){
        console.log('errorResponse.error.errorCode is here:',errorResponse.error.error.errorCode);

        }else{
          console.log('errorResponse.error.errorCode NOt here:');
        }
        
      }else{
        console.log('errorResponse.error NOt here:');

      }
    } */
    if(errorResponse.error.error && errorResponse.error.error.errorCode){
      switch (errorResponse.error.error.errorCode){
        case 'INVALID_CASE_ID':
          errorMessage += 'Invalid case ID provided. Please enter a valid number.';
          break;
        case 'CASE_RESOURCE_NOT_FOUND':
          errorMessage += 'The requested case was not found.'
          break;
        default:
          errorMessage +='An unexpected error occurred.';

      }
    }else if(errorResponse.status){
      if (errorResponse.status === 400) {
        errorMessage += 'Bad Request: Invalid input or parameters';      
      } else if (errorResponse.status === 404) {
        errorMessage += 'Not Found: The requested case does not exist, case id:'+caseId;
      } else if (errorResponse.status === 500) {
        errorMessage += 'Internal Server Error: something wrong with the server';
      }else{
        errorMessage += 'An unexpected error occured.';
      }
    }

/*     if(errorResponse.error && errorResponse.error.message){
      // errorMessage += ' '+error.error.message;
      errorMessage +=` Details: ${errorResponse.error.message}`;
    } */
    // console.error(errorMessage,Error);
    // return throwError(() => new Error(errorMessage));
    return throwError(
      () =>({
        status: errorResponse?.status,
        errorCode:errorResponse?.error?.error?.errorCode,
        message: errorMessage
      })
    );
  }

}

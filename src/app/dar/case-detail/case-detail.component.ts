import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss']
})
export class CaseDetailComponent implements OnInit {

  caseDetail : CaseDetail | null =null;
  errorMessage: string | null = null;

  // caseDetail: CaseNew = {
  //   caseId: 1,
  //   caseStatus: 'Pending',
  //   caseType: 'New',
  //   createdBy: 'John Doe',
  //   createdDate: '2021-06-01',
  //   modifiedDate: '2021-06-01',
  //   pendingReviewDate: '2021-06-01',
  //   note: 'This is a new case mocked by CaseDetailComponent.' 
  // };
  constructor(private caseService : CaseService) { }

  ngOnInit(): void {
    //will add code to retrieve case detail from API;
    this.getCaseDetail(2);
  }

  getCaseDetail(caseId: number): void {
    // Add logic to retrieve case detail from the service
    this.caseService.getCaseById(caseId).subscribe(
      (data: CaseDetail) => {
        this.caseDetail = data;
        this.errorMessage = null;
      },
      (error: any) => {
        this.errorMessage = error.message;
        this.caseDetail = null;
        console.error(this)
/*         // Check if the error is an HTTP error
        if(error.status === 400){  //handle 400 Bad Request
          console.error('Bad Request: Invalid input or parameters',error);
          alert('Invalid case ID or request parameters. Please check your input.');
        }
        if(error.status == 500){  // handle 500 Internal Error
          console.error('Internal Server Error: something wrong with the server',error);
          alert('There was a problem with the server. Please try again later.');
        }if(error.status == 404){ // handle 404 Not Found error
          console.error('Not Found: The requested case does not exist, case id:'+caseId,error);
          alert('The case you are looking for does not exist. Please verify the case ID.');
        }
        else{ // Handle other errors 
          console.error('An unexpected error occured.',error)
        } */

      }
    );
  }
}

export interface CaseNew {
  caseId: number;
  caseStatus: string;
  caseType: string;
  createdBy: string;
  createDate: string;
  modifiedDate: string;
  pendingReviewDate: string;
  note: string;
}

export interface CaseDetail{
  case: CaseNew;
}


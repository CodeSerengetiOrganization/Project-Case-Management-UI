import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss']
})
export class CaseDetailComponent implements OnInit {

  caseDetail : CaseDetail | undefined;

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
      },
      (error: any) => {
        console.error('Error retrieving case detail', error);
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


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss']
})
export class CaseDetailComponent implements OnInit {

  caseDetail: Case = {
    caseId: 1,
    caseStatus: 'Pending',
    caseType: 'New',
    createdBy: 'John Doe',
    createdDate: '2021-06-01',
    modifiedDate: '2021-06-01',
    pendingReviewDate: '2021-06-01',
    note: 'This is a new case mocked by CaseDetailComponent.' 
  };

  ngOnInit(): void {
    //will add code to retrieve case detail from API;
  }
}

export interface Case {
  caseId: number;
  caseStatus: string;
  caseType: string;
  createdBy: string;
  createdDate: string;
  modifiedDate: string;
  pendingReviewDate: string;
  note: string;
}


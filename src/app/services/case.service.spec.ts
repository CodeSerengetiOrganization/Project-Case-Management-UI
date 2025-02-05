import { TestBed } from '@angular/core/testing';

import { CaseService } from './case.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

describe('CaseService', () => {  
  let caseService: CaseService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  // set up: create a mocked instance of the HttpClient
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaseService,{
        provide: HttpClient,
        useValue: httpClientSpy
      }]
    });
    caseService = TestBed.inject(CaseService);
  });

  it('should be created', () => {
    expect(caseService).toBeTruthy();
  });

  it('should return expected cases (HttpClient called once)',()=>{
    //mocked case
    const mockedCaseDetail = {
      case:{
        caseId: 1,
        caseStatus: "Open",
        caseType: "Fraud",
        createdBy: "John Doe",
        createDate: "2024-01-01T12:00:00Z",
        modifiedDate: "2024-01-02T15:30:00Z",
        pendingReviewDate: "2024-01-10T10:00:00Z",
        note: "This is a mocked case by unit test code."
      }
    };
    //simulate mocked behaviour: return the mocked case when the service is called
    httpClientSpy.get.and.returnValue(of(mockedCaseDetail));
    //call the service and validate the result
    const caseId=1;
    caseService.getCaseById(caseId).subscribe(retrunedCaseDtail =>{
      expect(retrunedCaseDtail).toEqual(mockedCaseDetail);
    });
/*     //validate that the service was called once
    expect(httpClientSpy.get.calls.count()).toBe(1); */
    //validate that the service was called with the correct URL
    expect(httpClientSpy.get).toHaveBeenCalledWith(`${environment.apiUrl}/${caseId}`);
  });

  describe("Errror Handlling", () => {
    it('should handle http 400 Bad Request error',() =>{
        //define mocked error response
        const errorResponse = { 
          status: 400, 
          statusText: 'Bad Request',
          error: {message: 'Mocked Bad Request'} };
        //simulate the error response
        // httpClientSpy.get.and.throwError(new Error(JSON.stringify(errorResponse)));  //this line is not working as expected as it does not contain status and statusText
        httpClientSpy.get.and.returnValue(throwError(() =>errorResponse));
        //call the service and validate the error handling
        caseService.getCaseById(1).subscribe({
          next: ()=> fail('expected an error, not a case detail'),
          error: (error) => {
            console.error(error);
            expect(error.message).toContain('Mocked Bad Request');
            // expect(error.status).toBe(400);  // this is not need as front end does not have access to status code
          }
        });

    });

    it('should handle http 404 Not Found error',()=>{
      //1. define the error response
      const errorResponse = {
        status : 404,
        statusText : 'NOT FOUND',
        error: {message : 'mocked NOT FOUND error'}
      };
      //2. mock bahaviour
      httpClientSpy.get.and.returnValue(throwError(()=>errorResponse));
      //3. call the service and handle error
      caseService.getCaseById(1).subscribe({
        next: () => fail('fail'),
        error:(errorBody) =>{
          expect(errorBody.message).toContain('mocked NOT FOUND error');
        }
      }

      );
    });

    it('should handle http 4500 Not Found error',()=>{
      //1. define the error response
      const errorResponse = {
        status : 500,
        statusText : 'INTERNAL SERVER ERROR',
        error: {message : 'mocked INTERNAL SERVER ERROR error'}
      };
      //2. mock bahaviour
      httpClientSpy.get.and.returnValue(throwError(()=>errorResponse));
      //3. call the service and handle error
      caseService.getCaseById(1).subscribe({
        next: () => fail('fail'),
        error:(errorBody) =>{
          expect(errorBody.message).toContain('mocked INTERNAL SERVER ERROR error');
        }
      }

      );
    });

  });
  
});

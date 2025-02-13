import { TestBed } from '@angular/core/testing';

import { CaseService } from './case.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

describe('CaseService', () => {  
  let caseService: CaseService;
  // let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let httpMock: HttpTestingController
  // set up: create a mocked instance of the HttpClient
  // httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  const mockedApiUrl =  'http://localhost:8080/api/cases/v3';


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CaseService]
      // providers: [CaseService,{
      //   provide: HttpClient,
      //   useValue: httpClientSpy
      // }]
    });
    caseService = TestBed.inject(CaseService);
    httpMock = TestBed.inject(HttpTestingController);
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
    //2. invoke service to make the http call, assert the result
    const caseId=1;
    caseService.getCaseById(caseId).subscribe(returnedCaseDetail =>{
      expect(returnedCaseDetail).toEqual(mockedCaseDetail);
    });

    const req: TestRequest = httpMock.expectOne(`${mockedApiUrl}/${caseId}`);
    expect(req.request.method).toBe('GET');
    //3. response with mocked data
    req.flush(mockedCaseDetail);

  });

  describe("Errror Handlling", () => {
    it('should handle INVALID_CASE_ID error',() =>{
      //1. define mocked error response
      const errorResponse = { 
        status: 400, 
        error: {
          errorCode: 'INVALID_CASE_ID',
          message: 'mocked message will not be used'
        }
      };
      //2. mark the behaviour of the HTTP call
      const invalidCaseId = -1;
      //3. make the HTTP call
      caseService.getCaseById(invalidCaseId).subscribe({
        next : () =>{
          fail('Expect an error, but got a successful response.')
        },
        error : (error) =>{
          const errorStr : string = JSON.stringify(error,null,2);
          //4.assert the result
          expect(error.status).toBe(400);
          expect(errorStr).toContain('INVALID_CASE_ID');
          expect(errorStr).toContain('Invalid case ID provided. Please enter a valid number.');
        }
      });      

      //5. Simulate the HTTP response with an error
      const req = httpMock.expectOne(`${mockedApiUrl}/${invalidCaseId}`);

      req.flush(errorResponse,{status:400,statusText:'Bad Request'});
  });
    it('should handle http 400 Bad Request error',() =>{
      //1.define mocked error response
      const errorResponse = {
        satus:400,
        error:'This is a mocked 400 http error response with no data structure'
      };
      //2. make the api call and assert the results
      caseService.getCaseById(1).subscribe({
        next: () => {
          fail('Expect HTTP 400 error, but got a successful response');
        },
        error: (errorResponse) =>{
          expect(errorResponse).toEqual(errorResponse);
          expect(errorResponse.status).toEqual(400);
          expect(errorResponse.message).toContain('Bad Request: Invalid input or parameters');
          
        }        
      });
      //3. simulate the HTTP respoinse with the mocked error response
      const req = httpMock.expectOne(`${mockedApiUrl}/1`);
      req.flush(errorResponse,{status:400,statusText:'Mocked Bad Request'});
      // );
    });
    it('should handle 404 Not Found error', () =>{
      //1. mark the error response
      const errorResponse = {
        status: 404,
        error:"Mocked 404 error message, will be replaced by caseService"
      };
      //2. make the api call
      const nonExistingCaseId = 999;
       caseService.getCaseById(nonExistingCaseId).subscribe({
        next: () => {
          fail('Expect 404 error but successfully go through');
        },
        error: (errorResponse) => {
          //3. assert result: HTTP status, expected error message,
          expect(errorResponse.status).toBe(404);
          expect(errorResponse.message).toContain('Not Found: The requested case does not exist, case id:'+nonExistingCaseId);
        }
      }); 
      
      //4. simulate the HTTP response with mocked error response;
      const req = httpMock.expectOne(`${mockedApiUrl}/${nonExistingCaseId}`);
      req.flush(errorResponse,{status:404,statusText:'Mocked 404 error'});
    });
    it('should handle http 500 error',() =>{
      //1. mocke the error response;
      const mockedErrorResponse = {
        status:500,
        error:'Mocked http 500 error message, will be replaced by caseService'
      }
      //2. make the API call
      const internalServerErrorCaseId = 500;
      caseService.getCaseById(internalServerErrorCaseId).subscribe({
        next: ()=>{
          fail('Excpect HTTp 500 error but successfully go through');
        },
        error: (errorResponse) => {
          //3. assert the result
          expect(errorResponse.status).toBe(500);
          expect(errorResponse.message).toContain('Internal Server Error: something wrong with the server');
          // expect(errorResponse.error.statusText).toEqual('Mocked Internal Server Error');
        }
      });
      //4. simluate the http response 
      
      const req = httpMock.expectOne(`${mockedApiUrl}/${internalServerErrorCaseId}`);
      req.flush(mockedErrorResponse,{status: 500, statusText:'Mocked Internal Server Error'});
    });

  });
  
});

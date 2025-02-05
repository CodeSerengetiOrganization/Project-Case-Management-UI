import {ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing'
import { HttpErrorResponse } from '@angular/common/http';
import { CaseService } from 'src/app/services/case.service';
import { CaseDetailComponent } from './case-detail.component';
import { environment } from 'src/environments/environment';

describe('CaseDetailComponent', () => {
  let component: CaseDetailComponent;
  let fixture: ComponentFixture<CaseDetailComponent>;
  let service: CaseService;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ CaseDetailComponent ],
      providers: [CaseService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(CaseService);
    httpMock =  TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //error handling related test
  describe("Http Error Handling",() =>{
    beforeEach(()=>{
      spyOn(console,'error'); //creates a Jasmine spy for console.error.Spy on console.error to check if it's called
      spyOn(window,'alert');  // Spy on window.alert to check if it's called
    });

    it('should handle http 400 Bad Request error',() =>{
      const caseId=1;
      component.getCaseDetail(caseId);
      
      //Simulating HTTP 400 Error
      const req=httpMock.expectOne(`${environment.apiUrl}/${caseId}`);
      req.flush(null, {status:400,statusText:'Bad Request'});

      //Assertions for Error Handling
      //expect(console.error).toHaveBeenCalledWith('Bad Request: Invalid input or parameters',expect.anything());

      expect(console.error).toHaveBeenCalledWith('Bad Request: Invalid input or parameters', jasmine.any(HttpErrorResponse));
      expect(window.alert).toHaveBeenCalledWith('Invalid case ID or request parameters. Please check your input.');
    });

    it('should handle http 500 Internal Server error',() =>{
      const caseId=1;
      component.getCaseDetail(caseId);
      const req=httpMock.expectOne(`${environment.apiUrl}/${caseId}`);
      req.flush(null,{status:500,statusText:'Internal Server Error'});
      //Assertions for Error Handling
    // expect(console.error).toHaveBeenCalledWith('Internal Server Error: something wrong with the server',jasmine.anything());
    expect(console.error).toHaveBeenCalledWith('Internal Server Error: something wrong with the server',jasmine.any(HttpErrorResponse));
    expect(window.alert).toHaveBeenCalledWith('There was a problem with the server. Please try again later.');
  });

    it('should handle http 404 Not Found error',()=>{
      const caseId=9999;
      component.getCaseDetail(caseId);
      const req=httpMock.expectOne(`${environment.apiUrl}/${caseId}`);
      req.flush(null,{status:404,statusText:'Not Found'})
      //Assertions for Error Handling
      expect(console.error).toHaveBeenCalledWith('Not Found: The requested case does not exist, case id:'+caseId,jasmine.any(HttpErrorResponse));
      expect(window.alert).toHaveBeenCalledWith('The case you are looking for does not exist. Please verify the case ID.');
    });
  });


    
});

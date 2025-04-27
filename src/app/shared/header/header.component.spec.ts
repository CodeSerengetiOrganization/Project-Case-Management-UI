import { ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing'; // Helps test routing
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // Lets us check current URL path
import { By } from '@angular/platform-browser'; // Helps select elements in HTML

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([
        {path: 'home', component:DummyComponent},
        {path: 'casemanagement', component:DummyComponent},
        {path: 'workflow', component:DummyComponent}
      ])],
      declarations: [ HeaderComponent ] // we should not need it as we are using Angular14 after version.
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
      //added for routing test
    router = TestBed.inject(Router); // Get a router instance
    location = TestBed.inject(Location); // Get current URL path
    fixture = TestBed.createComponent(HeaderComponent); // Create the header
    component = fixture.componentInstance;
    router.initialNavigation(); // Start Angular routing--need further investigation
    fixture.detectChanges(); // Render the compon
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo',()=>{
    // expect(false).toBe(true); // Force a failure
    const logo = fixture.nativeElement.querySelector('.logo img');
    // console.log('Logo Value:', logo); // Check the value of logo
    expect(logo).toBeTruthy();
    expect(logo.src).toContain('assets/images/logo-cms-tech.png');    
    expect(logo.alt).toContain('The Application Logo');
  });

  it('should render the CaseManage and WorkFlow buttons',()=>{
      const buttons = fixture.nativeElement.querySelectorAll('.menu-button');
      expect(buttons.length).toBe(3); //check the button numbers
      expect(buttons[0].textContent.trim()).toBe('Home');
      expect(buttons[1].textContent.trim()).toBe('CaseManage');
      expect(buttons[2].textContent.trim()).toBe('WorkFlow')
  });

  
  describe('Menu Buttons Routing Related Test',()=>{

    //test the home button
    it('should negative to /home parth when click Home buttion',fakeAsync(()=>{
      //1. get the Home button;
      const buttons = fixture.debugElement.queryAll(By.css('button.menu-button'));
      const homeButton = buttons.find(
        btn =>{
          return btn.nativeElement.textContent.trim() === 'Home';
        });
      expect(homeButton).toBeTruthy;
      //2. make the action to click it;
      homeButton?.nativeElement.click();
      tick();
      //3. assert the result
      expect(location.path()).toBe('/home');
    }));

    it('should nevigate to /casemanagement path when click CaseManagement button',fakeAsync(()=>{
      //1. get the button
      const allButtons = fixture.debugElement.queryAll(By.css('button.menu-button'));
      const cmButton =  allButtons.find(
        btn => btn.nativeElement.textContent.trim() === 'CaseManage'
      );
      expect(cmButton).toBeTruthy();
      //2. click the button
      cmButton?.nativeElement.click();
      tick();
      //3.assert the path
      expect(location.path()).toBe('/casemanagement')
    }));

    it('should nevigate to /workflow when click Workflow button',fakeAsync(()=>{
      //1. locate the button
      const allButtons = fixture.debugElement.queryAll(By.css('button.menu-button'));
      const workflowBtn = allButtons.find(
        btn => btn.nativeElement.textContent.trim() === 'WorkFlow'
      );
      //2. simulate to trigge the button
      workflowBtn?.nativeElement.click();
      //3. wait and assert the path
      tick();
      expect(location.path()).toBe('/workflow');
    }));
  });



});

// Dummy component just for route testing
import { Component } from '@angular/core';
@Component({template: ''})
class DummyComponent {}


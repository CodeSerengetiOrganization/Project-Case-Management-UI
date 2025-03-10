import { ComponentFixture, TestBed} from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

});



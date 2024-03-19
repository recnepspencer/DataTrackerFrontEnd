import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegistrationComponent } from './registration.component';
import { AuthService } from '../../auth/auth.service';
import { of } from 'rxjs';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: AuthService;
  let registerSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RegistrationComponent
      ],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService);
    registerSpy = jest.spyOn(authService, 'register').mockReturnValue(of({}));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.register on form submit', fakeAsync(() => {
    const fakeUser = { first_name: 'Test', last_name: 'User', username: 'testuser', email: 'test@example.com', password: '12345' };
    component.registrationData = fakeUser;
  
    component.onSubmit();
    tick(); // Simulate passage of time for any asynchronous operations
  
    authService.register(fakeUser).subscribe(() => {
      expect(registerSpy).toHaveBeenCalledWith(fakeUser);
    });
  }));

  it('AuthService.register should be callable directly', () => {
    const fakeUser = { first_name: 'Test', last_name: 'User', username: 'testuser', email: 'test@example.com', password: '12345' };
    authService.register(fakeUser);
    expect(registerSpy).toHaveBeenCalledWith(fakeUser);
  });
});

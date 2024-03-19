import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgZone } from '@angular/core';

@Component({ template: '' })
class DummyComponent {}
describe('LoginComponent Execution Logic', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'user-details', component: DummyComponent }, // DummyComponent can be a simple component created for test purposes
        ]),
        LoginComponent,
      ],
      // No need to mock AuthService here, use the actual service
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    router = TestBed.inject(Router); // Get the AuthService instance from the component
  });

  it('should call AuthService.login when onSubmit is called', fakeAsync(() => {
    const loginSpy = jest.spyOn(authService, 'login'); // Set up the spy
    const loginData = { username: 'testuser', password: 'testpass' };
    component.loginData = loginData;

    component.onSubmit();
    tick();
    flush(); // Ensure all async operations complete

    expect(loginSpy).toHaveBeenCalledWith(loginData);
    // console.log('ErrorMessage after login attempt:', component.errorMessage);
  }));

  it('should navigate to user-details on successful login', fakeAsync(() => {
    const ngZone = TestBed.inject(NgZone);
    const loginData = { username: 'testuser', password: 'testpass' };
    component.loginData = loginData;

    jest
      .spyOn(authService, 'login')
      .mockReturnValue(of({ access_token: 'dummy-token' }));
    const navigateSpy = jest.spyOn(router, 'navigate');

    // Ensure onSubmit is run inside Angular zone
    ngZone.run(() => {
      component.onSubmit();
    });

    tick();
    flush();

    expect(authService.login).toHaveBeenCalledWith(loginData);
    expect(navigateSpy).toHaveBeenCalledWith(['/user-details']);
  }));

  it('should display error message on failed login', fakeAsync(() => {
    const loginData = { username: 'wronguser', password: 'wrongpass' };
    component.loginData = loginData;

    jest.spyOn(authService, 'login')
        .mockReturnValue(throwError(() => ({ error: new Error('Unauthorized'), status: 401 })));

    component.onSubmit();
    tick();
    flush();

    expect(authService.login).toHaveBeenCalledWith(loginData);
    expect(component.errorMessage).toBe('Incorrect username or password, please try again');
}));
});

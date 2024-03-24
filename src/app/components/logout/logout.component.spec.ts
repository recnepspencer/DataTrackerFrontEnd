import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LogoutComponent } from './logout.component';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';


describe('LogoutComponent', () => {
  let logoutComponent: LogoutComponent;
  const authServiceMock = {
    logout: jest.fn(),
  };
  const httpClientMock = {}; // Mock HttpClient as needed
  const routerMock = {
    navigate: jest.fn().mockReturnValue(Promise.resolve(true)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: HttpClient, useValue: httpClientMock },
        { provide: Router, useValue: routerMock },
        LogoutComponent, // Ensure LogoutComponent is provided if it's standalone
      ],
    }).compileComponents();

    logoutComponent = TestBed.createComponent(LogoutComponent).componentInstance;
  });

  it('should call AuthService.logout on logout', fakeAsync(() => {
    authServiceMock.logout.mockReturnValue(['logged out']);
    logoutComponent.onLogout();
    tick();
    expect(authServiceMock.logout).toHaveBeenCalled();
  }));

});

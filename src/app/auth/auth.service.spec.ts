import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { devEnvironment } from '../enviornments/enviornment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure that there are no outstanding requests
    localStorage.clear(); // Clear localStorage after each test
  });

  // Test for the login method
  it('should send a login request', () => {
    const mockResponse = { token: 'fake-jwt-token' };
    const credentials = { username: 'testUser', password: 'testPassword' };
  
    service.login(credentials).subscribe(response => {
      expect(response.token).toEqual('fake-jwt-token');
    });
  
    const req = httpMock.expectOne(`${devEnvironment.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);
    req.flush(mockResponse);
  });

  // Test for the register method
  it('should send a register request', () => {
    const mockUser = { first_name: 'John', last_name: 'Doe', username: 'johndoe', email: 'john@example.com', password: 'password123' };
    const mockResponse = { message: 'User registered successfully' };
  
    service.register(mockUser).subscribe(response => {
      expect(response.message).toEqual('User registered successfully');
    });
  
    const req = httpMock.expectOne(`${service['apiUrl']}/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockResponse);
  });

  // Test for the logout method
  it('should send a logout request and clear local storage', () => {
    localStorage.setItem('token', 'some-token-value');
    expect(localStorage.getItem('token')).toEqual('some-token-value');
    service.logout().subscribe();
    const req = httpMock.expectOne(`${service.apiUrl}/logout`);
    expect(req.request.method).toBe('POST');
    req.flush({});
    expect(localStorage.getItem('token')).toBeNull();
  });


});



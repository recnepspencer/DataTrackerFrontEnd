import { TestBed } from '@angular/core/testing';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { Observable, of } from 'rxjs';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor]
    });
    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should add an Authorization header when access_token is present', () => {
    const request = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: jest.fn().mockImplementation(() => of({}))
    };

    localStorage.setItem('access_token', 'token123');
    interceptor.intercept(request, next).subscribe();

    expect(next.handle).toHaveBeenCalled();
    const interceptedRequest = (next.handle as jest.Mock).mock.calls[0][0] as HttpRequest<any>;
    expect(interceptedRequest.headers.has('Authorization')).toBe(true);
    expect(interceptedRequest.headers.get('Authorization')).toBe('Bearer token123');
  });

  it('should not add an Authorization header when no access_token is present', () => {
    const request = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: jest.fn().mockImplementation(() => of({}))
    };

    localStorage.removeItem('access_token');
    interceptor.intercept(request, next).subscribe();

    expect(next.handle).toHaveBeenCalled();
    const interceptedRequest = (next.handle as jest.Mock).mock.calls[0][0] as HttpRequest<any>;
    expect(interceptedRequest.headers.has('Authorization')).toBe(false);
  });
});
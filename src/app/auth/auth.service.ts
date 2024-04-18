import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8000/api';

  userLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userLoggedIn$ = this.userLoggedIn.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    // Only interact with localStorage if in browser environment
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedIn = localStorage.getItem('access_token');
      this.userLoggedIn = new BehaviorSubject<boolean>(isLoggedIn ? true : false);
      console.log('User logged in:', this.userLoggedIn.value);
      this.userLoggedIn$ = this.userLoggedIn.asObservable();
    } else {
      this.userLoggedIn = new BehaviorSubject<boolean>(false);
      this.userLoggedIn$ = this.userLoggedIn.asObservable();
    }
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return new Observable(observer => {
       this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Assuming 'access_token' is returned on successful login
        localStorage.setItem('access_token', response.access_token);
        this.userLoggedIn.next(true);
      }),
      catchError(error => throwError(() => error))
    ).subscribe({
      next: (response) => {
        this.userLoggedIn.next(true);

        this.router.navigate(['/user-details']);
      },
      error: (error) => {
        console.error('Login error:', error);
      }

    })});
  }

  register(user: { first_name: string; last_name: string; username: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  logout(): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/logout`, {}).subscribe({
        next: () => {
          localStorage.removeItem('access_token');
          this.userLoggedIn.next(false);
          observer.next();
          observer.complete();
          console.log(localStorage.getItem('access_token'));

        },
        error: error => {
          console.error('Logout error:', error);
          observer.error(error);
        }
      });
    });
  }



}

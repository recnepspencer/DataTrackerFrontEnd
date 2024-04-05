import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8000/api';
  loggedIn = new BehaviorSubject<boolean>(true);
  

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
        tap(response => {
            // Perform side effects: set the logged-in state and store the token
            this.loggedIn.next(true);
            localStorage.setItem('access_token', response.access_token);
        }),
        catchError(error => {
            // Handle errors if any
            return throwError(() => error);
        })
    );
}

  register(user: { first_name: string; last_name: string; username: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  
  logout(): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/logout`, {}).subscribe({
        next: () => {
          localStorage.removeItem('access_token');
          this.loggedIn.next(false);
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
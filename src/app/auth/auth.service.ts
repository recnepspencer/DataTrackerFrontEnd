import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { devEnvironment } from '../enviornments/enviornment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  register(user: { first_name: string; last_name: string; username: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  
  logout(): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/logout`, {}).subscribe({
        next: () => {
          localStorage.removeItem('token');
          observer.next();
          observer.complete();
        },
        error: error => {
          console.error('Logout error:', error);
          observer.error(error);
        }
      });
    });
  }
}
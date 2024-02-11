import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/user/data'

  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateWeight(weight: number): Observable<any> {
    return this.http.post(this.apiUrl, { weight });
  }

  updateGender(gender: 'm' | 'f'): Observable<any> {
    return this.http.post(this.apiUrl, { gender });
  }

}
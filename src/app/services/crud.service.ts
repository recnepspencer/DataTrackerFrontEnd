import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  create(data: any, uri: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${uri}`, data);
  }

  index(uri: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${uri}`);
  }

  show(id: number, uri: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${uri}/${id}`);
  }

  update(id: number, data: any, uri: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${uri}/${id}`, data);
  }

  delete(id: number, uri: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${uri}/${id}`);
  }
}

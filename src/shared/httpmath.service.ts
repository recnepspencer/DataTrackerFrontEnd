import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MathService {
  constructor(private http: HttpClient) {}

  addNumbers(a: number, b: number) {
    const headers = { 'Custom-Header': 'value' };
    return this.http.post('/api/add', { a, b }, { headers });
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AiCaloriesService {

  private apiUrl = 'http://localhost:5000/convert';

  constructor(private http: HttpClient) { }

  public analyzeImage(formData: FormData) {
    return this.http.post(this.apiUrl, formData, { responseType: 'text' });
  }
}
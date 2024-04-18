import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AiCaloriesService {

  private aiApi = 'http://127.0.0.1:5000/convert';

  constructor(private http: HttpClient) { }

  public analyzeImage(formData: FormData) {
    return this.http.post(this.aiApi, formData, { responseType: 'text' });
  }
}
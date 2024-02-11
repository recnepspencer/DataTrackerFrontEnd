import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SleepTrackingService {
  private apiUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  reportSleep(sleepData: { startTime: Date, endTime: Date, quality: number }): Observable<any> {
    const formatDateTime = (date: Date) => 
    date.toISOString().replace(/\.\d{3}Z$/, ''); // Remove milliseconds and 'Z'

  const dataToSend = {
    sleep_time: formatDateTime(sleepData.startTime),
    awake_time: formatDateTime(sleepData.endTime),
    sleep_quality: sleepData.quality
  };
    console.log('Sending sleep data:', dataToSend);
    return this.http.post(`${this.apiUrl}/sleep-tracking`, dataToSend);
  }

  getSleepHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sleep-tracking`);
  }

  updateSleepRecord(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/sleep-tracking/${id}`, data);
  }

  deleteSleepRecord(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/sleep-tracking/${id}`);
  }
}
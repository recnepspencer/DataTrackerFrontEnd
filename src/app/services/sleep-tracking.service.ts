import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class SleepTrackingService {
  constructor(private crudService: CrudService) { }

  private uri = 'sleep-tracking';

  createSleepRecord(sleepData: { sleepStartTime: Date, sleepEndTime: Date, sleepQuality: number }): Observable<any> {

    const dataToSend = this.makeSleepRecordObject(sleepData);

    return this.crudService.create(dataToSend, this.uri);
  }

  readSleepRecords(): Observable<any> {
    return this.crudService.index(this.uri);
  }

  showSleepRecord(id: number): Observable<any> {
    return this.crudService.show(id, this.uri);
  }

  updateSleepRecord(id: number, data: any): Observable<any> {
    return this.crudService.update(id, data, this.uri);
  }

  deleteSleepRecord(id: number): Observable<any> {
    return this.crudService.delete(id, this.uri);
  }

  makeSleepRecordObject(sleepData: { sleepStartTime: Date, sleepEndTime: Date, sleepQuality: number }) {
    return {
      sleep_time: this.formatDateTime(sleepData.sleepStartTime),
      awake_time: this.formatDateTime(sleepData.sleepEndTime),
      sleep_quality: sleepData.sleepQuality
    };
  }

  formatDateTime(date: Date) {
    return date.toISOString().replace(/\.\d{3}Z$/, ''); // Remove milliseconds and 'Z'
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SleepTrackingService } from '../../../services/sleep-tracking.service';

@Component({
  selector: 'app-sleep-tracking',
  templateUrl: './sleep-tracking.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [SleepTrackingService]
})
export class SleepTrackingComponent {
  sleepData = {sleepStartTime: new Date(), sleepEndTime: new Date(), sleepQuality: 1 };
  sleepHistory: any[] = [];

  constructor(private sleepTrackingService: SleepTrackingService) {}

  onSubmit(): void {
    this.reportSleep();
  }

  reportSleep(): void {
    this.sleepData.sleepStartTime = new Date(this.sleepData.sleepStartTime);
    this.sleepData.sleepEndTime = new Date(this.sleepData.sleepEndTime);

    this.sleepTrackingService.createSleepRecord(this.sleepData).subscribe({
      next: this.reportSleepNext.bind(this),
      error: this.reportSleepError.bind(this)
    });
  }

  reportSleepNext(response: any) {
    console.log('Sleep data reported successfully', response);
    this.loadSleepHistory(); // Refresh the list
  }

  reportSleepError(error: any) {
    console.error('There was an error!', error);
  }

  loadSleepHistory(): void {
    this.sleepTrackingService.readSleepRecords().subscribe({
      next: this.loadSleepHistoryNext.bind(this),
      error: this.loadSleepHistoryError.bind(this)
    });
  }

  loadSleepHistoryNext(response: any) {
    this.sleepHistory = response;
  }

  loadSleepHistoryError(error: any) {
    console.error('Error fetching sleep history', error);
  }

  editSleepRecord(id: number): void {


    // Implement functionality as needed
    console.log('Editing record with id:', id);
    // This might involve populating the form with the record's data
    // and then submitting it to the `updateSleepRecord` method of the service.
  }

  deleteSleepRecord(id: number): void {
    this.sleepTrackingService.deleteSleepRecord(id).subscribe({
      next: this.deleteSleepRecordNext.bind(this),
      error: this.deleteSleepRecordError.bind(this)
    });
  }

  deleteSleepRecordNext(response: any) {
    console.log('Record deleted successfully', response);
    this.loadSleepHistory(); // Refresh the list after deletion
  }

  deleteSleepRecordError(error: any) {
    console.error('Error deleting record', error);
  }
}

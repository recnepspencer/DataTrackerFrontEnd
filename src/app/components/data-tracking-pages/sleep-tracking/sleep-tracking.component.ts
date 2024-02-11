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
  sleepData = {startTime: new Date(), endTime: new Date(), quality: 1 };
  sleepHistory: any[] = [];

  constructor(private sleepTrackingService: SleepTrackingService) {}

  reportSleep(): void {
    this.sleepData.startTime = new Date(this.sleepData.startTime);
    this.sleepData.endTime = new Date(this.sleepData.endTime);
  
    console.log('Reporting sleep data:', this.sleepData);
    this.sleepTrackingService.reportSleep(this.sleepData).subscribe({
      next: (response) => {
        console.log('Sleep data reported successfully', response);
        this.loadSleepHistory(); // Refresh the list
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

  loadSleepHistory(): void {
    this.sleepTrackingService.getSleepHistory().subscribe({
      next: (history) => {
        this.sleepHistory = history;
      },
      error: (error) => console.error('Error fetching sleep history', error)
    });
  }

  editSleepRecord(id: number): void {

    
    // Implement functionality as needed
    console.log('Editing record with id:', id);
    // This might involve populating the form with the record's data
    // and then submitting it to the `updateSleepRecord` method of the service.
  }

  deleteSleepRecord(id: number): void {
    this.sleepTrackingService.deleteSleepRecord(id).subscribe({
      next: () => {
        console.log('Record deleted successfully');
        this.loadSleepHistory(); // Refresh the list after deletion
      },
      error: (error) => console.error('Error deleting record', error)
    });
  }
}
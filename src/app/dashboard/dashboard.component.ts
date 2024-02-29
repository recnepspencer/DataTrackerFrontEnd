import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { SleepSessionComponent } from './cards/sleep-session/sleep-session.component';
import { SleepTrackingService } from '../services/sleep-tracking.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, SleepSessionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router, private sleepTrackingService: SleepTrackingService) {}

  onReportSleep() {
    this.router.navigate(['/track/sleep']);
  }

  handleSessionStarted(startTime: Date): void {
    console.log('Sleep session started at:', startTime);
    // Process the start time as needed
  }

  handleSessionEnded(sessionData: { sleepStartTime: Date, sleepEndTime: Date; sleepQuality: number }): void {
    console.log('Sleep session data: ', sessionData);

    this.sleepTrackingService.createSleepRecord(sessionData).subscribe({
      next: this.handleSessionEndedNext.bind(this),
      error: this.handleSessionEndedError.bind(this)
    });
  }

  handleSessionEndedNext (data: any) {
    console.log('Sleep data saved successfully', data);
  }

  handleSessionEndedError (error: any) {
    console.error('Error saving sleep data', error);
  }

}

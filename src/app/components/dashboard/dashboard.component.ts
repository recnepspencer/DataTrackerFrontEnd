import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { SleepSessionComponent } from './cards/sleep-session/sleep-session.component';
import { SleepTrackingService } from '../../services/sleep-tracking.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, SleepSessionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router, private sleepTrackingService: SleepTrackingService) {}

  trackSleepSubmit() {
    this.router.navigate(['/track/sleep']);
  }

  handleSessionStarted(startTime: Date): void {
    console.log('Sleep session started at:', startTime);
    // Process the start time as needed
  }

  handleSessionEnded(sessionData: { startTime: Date, endTime: Date; quality: number }): void {
    console.log('Sleep session data: ', sessionData);
    this.sleepTrackingService.reportSleep(sessionData).subscribe({
      next: (response) => {
        console.log('Sleep data saved successfully', response);
        // Optionally, refresh or update the UI here, e.g., load updated sleep history
      },
      error: (error) => console.error('Error saving sleep data', error)
    });
  }



}

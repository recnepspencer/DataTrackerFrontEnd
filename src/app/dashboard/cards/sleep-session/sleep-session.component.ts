import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sleep-session',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sleep-session.component.html',
  styleUrl: './sleep-session.component.css'
})

export class SleepSessionComponent {
  @Output() sessionEnded = new EventEmitter<{ sleepStartTime: Date, sleepEndTime: Date, sleepQuality: number }>();

  private sleepStartTime: Date | undefined = undefined;

  isSleeping: boolean = false;
  showSleepQuality: boolean = false;

  sleepQuality: number = 1;

  onStartSleeping(): void {
    this.toggleIsSleeping(true);
    this.toggleSleepQualityInput(false);
    this.setSleepStartTime();
  }

  onStopSleeping(): void {
    this.toggleIsSleeping(false);
    this.toggleSleepQualityInput(true);
  }

  onSubmit(): void {
    this.submitSleepData();
  }

  setSleepStartTime(): void {
    this.sleepStartTime = new Date();
  }

  toggleSleepQualityInput(showSleepQuality: boolean): void {
    this.showSleepQuality = showSleepQuality;
  }

  toggleIsSleeping(isSleeping: boolean): void {
    this.isSleeping = isSleeping;
  }

  submitSleepData(): void {
    if (this.sleepStartTime) {
      const endTime = new Date();
      this.sessionEnded.emit({ sleepStartTime: this.sleepStartTime, sleepEndTime: endTime, sleepQuality: this.sleepQuality });
    }
    this.toggleSleepQualityInput(false);
    this.sleepStartTime = undefined; // Reset start time for next session
  }
}

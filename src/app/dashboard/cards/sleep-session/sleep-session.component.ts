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
  isSleeping = false;
  showSleepQuality = false;
  sleepQuality: number = 1;
  private sleepStart?: Date; // Store start time locally

  @Output() sessionEnded = new EventEmitter<{ startTime: Date, endTime: Date, quality: number }>();

  startSleeping(): void {
    this.isSleeping = true;
    this.showSleepQuality = false;
    this.sleepStart = new Date(); // Capture and store start time
  }

  showSleepQualityInput(): void {
    this.isSleeping = false;
    this.showSleepQuality = true;
  }

  stopSleeping(): void {
    if (this.sleepStart) {
      const endTime = new Date();
      this.sessionEnded.emit({ startTime: this.sleepStart, endTime: endTime, quality: this.sleepQuality });
    }
    this.showSleepQuality = false;
    this.sleepStart = undefined; // Reset start time for next session
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MathService } from './httpmath.service';

@Component({
  selector: 'app-math',
  template: `
    <button (click)="performOperation()">Add Numbers</button>
  `
})
export class MathComponent {
  constructor(private mathService: MathService, private router: Router) {}

  performOperation() {
    this.mathService.addNumbers(5, 10).subscribe({
      next: (result) => {
        console.log('Operation successful:', result);
        this.router.navigate(['/result-page']);
      },
      error: (error) => {
        console.error('Operation failed:', error);
      }
    });
  }
}
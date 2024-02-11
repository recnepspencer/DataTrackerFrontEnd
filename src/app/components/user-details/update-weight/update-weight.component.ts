import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-weight',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-weight.component.html',
  styleUrl: './update-weight.component.css'
})
export class UpdateWeightComponent {
  @Input() currentWeight!: number;
  @Output() weightUpdated = new EventEmitter<number>();

  newWeight!: number;

  constructor() {}

  submitWeight() {
    this.weightUpdated.emit(this.newWeight);
  }
}
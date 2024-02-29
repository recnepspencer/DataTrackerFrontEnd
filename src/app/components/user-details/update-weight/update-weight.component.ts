import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-update-weight',
  standalone: true,
  imports: [FormsModule, ],
  templateUrl: './update-weight.component.html',
  styleUrl: './update-weight.component.css'
})
export class UpdateWeightComponent {
  @Input() currentWeight!: number;
  @Input() user: any;
  @Output() weightUpdated = new EventEmitter<number>();


  newWeight!: number;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  onSubmitWeight() {
    this.updateWeight(this.newWeight);
  }

  onCancel() {
    this.dialog.closeAll();
  }

  updateWeight(newWeight: number) {
    this.userService.updateUserWeight(newWeight).subscribe({
      next: this.updateWeightNext.bind(this),
      error: this.updateWeightError.bind(this)
    });
  }

  updateWeightNext(newWeight: any) {
    this.user.weight = newWeight;
    this.dialog.closeAll();
  }

  updateWeightError(error: any) {
    console.error('Error updating weight:', error);
    this.dialog.closeAll();
  }
}

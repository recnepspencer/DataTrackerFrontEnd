import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalorieTrackerService } from '../../../../../services/calorie-tracker.service';
declare var bootstrap: any;

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {
  @Input() recipe: any;
  @Output() deleteRequest = new EventEmitter<number>();
  servings: number | null = null;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private calorieTrackerService: CalorieTrackerService) {}

  deleteRecipe(recipeId: number): void {
    this.deleteRequest.emit(recipeId);
  }

  openServingsModal(): void {
    const modal = new bootstrap.Modal(document.getElementById(`servingsModal${this.recipe.id}`));
    modal.show();
  }

  confirmServings(): void {
    if (!this.servings || this.servings <= 0) {
      // Show error message
      setTimeout(() => this.showErrorMessage = false, 3000); // Hide after 3 seconds
      this.showErrorMessage = true;
      return;
    }
  
    const consumptionData = {
      meal_id: this.recipe.id,
      servings_consumed: this.servings,
    };
  
    this.calorieTrackerService.recordConsumption(consumptionData).subscribe({
      next: () => {
        this.servings = null;
        // Show success message

        setTimeout(() => this.showSuccessMessage = false, 3000); // Hide after 3 seconds
        this.showSuccessMessage = true;
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById(`servingsModal${this.recipe.id}`));
        modal.hide();
      },
      error: (error) => {
        console.error('Error recording consumption:', error);
        // Show error message
        setTimeout(() => this.showErrorMessage = false, 3000); // Hide after 3 seconds
        this.showErrorMessage = true;
      },
    });
  }

  
}
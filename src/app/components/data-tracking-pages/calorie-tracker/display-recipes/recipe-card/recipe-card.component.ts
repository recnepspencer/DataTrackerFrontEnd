declare var bootstrap: any;
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalorieTrackerService } from '../../../../../services/calorie-tracker.service';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [FormsModule, EditRecipeComponent, CommonModule],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  @Input() recipe: any;
  @Output() deleteRequest = new EventEmitter<number>();
  isEditing = false; // State to manage whether the edit form should be shown
  servings: number | null = null;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private calorieTrackerService: CalorieTrackerService) {}

  toggleEdit(): void {
    this.isEditing = !this.isEditing; // Toggle editing state
  }

  deleteRecipe(recipeId: number): void {
    this.deleteRequest.emit(recipeId); // Emit delete event
  }

  openServingsModal(): void {
    // Correct way to handle Bootstrap modal
    const modal = new bootstrap.Modal(document.getElementById(`servingsModal${this.recipe.id}`));
    modal.show();
  }

  confirmServings(): void {
    if (!this.servings || this.servings <= 0) {
      this.showErrorMessage = true;
      setTimeout(() => this.showErrorMessage = false, 3000);
      return;
    }
    const consumptionData = {
      meal_id: this.recipe.id,
      servings_consumed: this.servings
    };
    this.calorieTrackerService.recordConsumption(consumptionData).subscribe({
      next: () => {
        this.servings = null;
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
        // Close the modal programmatically
        const modal = bootstrap.Modal.getInstance(document.getElementById(`servingsModal${this.recipe.id}`));
        modal.hide();
      },
      error: (error) => {
        console.error('Error recording consumption:', error);
        this.showErrorMessage = true;
        setTimeout(() => this.showErrorMessage = false, 3000);
      }
    });
  }
}

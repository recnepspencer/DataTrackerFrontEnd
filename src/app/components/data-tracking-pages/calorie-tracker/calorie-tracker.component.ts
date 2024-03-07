// calorie-tracker.component.ts
import { Component } from '@angular/core';
import { CalorieTrackerService } from '../../../services/calorie-tracker.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { DisplayRecipesComponent } from './display-recipes/display-recipes.component';
import { ConsumptionGraphsComponent } from './consumption-graphs/consumption-graphs.component';


@Component({
  selector: 'app-calorie-tracker',
  templateUrl: './calorie-tracker.component.html',
  styleUrls: ['./calorie-tracker.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, AddRecipeComponent, DisplayRecipesComponent, ConsumptionGraphsComponent],
  providers: [CalorieTrackerService]
})
export class CalorieTrackerComponent {
  showAddRecipe: boolean = false; // Control visibility of AddRecipeComponent
  showRecipes: boolean = false; // Control visibility of DisplayRecipesComponent
  recipes: any[] = []; // Assuming you have a method to fetch and store recipes

  constructor(private calorieTrackerService: CalorieTrackerService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes(): void {
    // Fetch recipes and populate the recipes array
    this.calorieTrackerService.getAllMeals().subscribe({
      next: (response) => {
        this.recipes = response;
      },
      error: (error) => console.error('Error fetching recipes:', error)
    });
  }

  onRecipeAdded(event: any): void {
    // Handle the event when a new recipe is added
    this.loadRecipes(); // Reload recipes to include the newly added one
  }
}
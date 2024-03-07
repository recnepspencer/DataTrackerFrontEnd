import { Component, OnInit } from '@angular/core';
import { CalorieTrackerService } from '../../../../services/calorie-tracker.service';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';

CommonModule
@Component({
  selector: 'app-display-recipes',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent],
  templateUrl: './display-recipes.component.html',
  styleUrl: './display-recipes.component.css'
})
export class DisplayRecipesComponent implements OnInit {
  recipes: any[] = [];

  constructor(private calorieTrackerService: CalorieTrackerService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.calorieTrackerService.getAllMeals().subscribe({
      next: (response) => {
        this.recipes = response;
      },
      error: (error) => console.error('Error fetching recipes:', error)
    });
  }

  onDeleteRequest(recipeId: number): void {
    // Call service to delete recipe, then reload recipes
    this.calorieTrackerService.deleteMeal(recipeId).subscribe({
      next: () => this.loadRecipes(),
      error: (error) => console.error('Error deleting recipe:', error)
    });
  }
}
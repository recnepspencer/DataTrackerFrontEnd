// calorie-tracker.component.ts
import { Component } from '@angular/core';
import { AiCaloriesService } from '../../../../services/ai-calories.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalorieTrackerService } from '../../../../services/calorie-tracker.service';


interface Ingredient {
  name: string;
  calories: number;
  quantity: string;
  protein: number;
  fat: number;
  carbs: number;
}

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [AiCaloriesService, CalorieTrackerService]
})
export class AddRecipeComponent {
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  recipeName: string = '';
  ingredients: Ingredient[] = [];
  servings!: number;
  mealService: any;
  isLoading = false;
  isSuccess = false;
  isError = false;

  constructor(private aiCaloriesService: AiCaloriesService, private calorieTrackerService: CalorieTrackerService) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Assuming you already have this for storing the file
      this.selectedFileName = file.name; // Store the file name
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      this.isLoading = true;

      this.aiCaloriesService.analyzeImage(formData).subscribe({
        next: (response) => {
          // Assuming 'response' is actually a JSON string, we need to parse it.
          let parsedResponse;
          try {
            parsedResponse = JSON.parse(response);
            this.isLoading = false;
          } catch (e) {
            console.error('Error parsing response:', e);
            this.isLoading = false;
            return; // Exit if parsing fails
          }
      
          console.log('Parsed Response:', parsedResponse); // Now should log the array
          console.log('Is array:', Array.isArray(parsedResponse)); // Should log 'true'
      
          // Now pass the parsedResponse, which is an array, to populateIngredients
          this.populateIngredients(parsedResponse);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }
  selectRecipe(): void {
    // Logic to handle "Select Recipe" action
  }

  addServings(): void {
    // Logic to handle "Add Servings" action
  }
  
  addNewRecipe(): void {
    // Logic to handle "Add a New One" action
  }

  addIngredient(): void {
    this.ingredients.push({ name: '', calories: 0, quantity: '', protein: 0, fat: 0, carbs: 0 });
  }

  populateIngredients(data: any): void {
    console.log('Data to map:', data); // Debugging line
    if (Array.isArray(data)) {
      this.ingredients = data.map((ingredient: any) => ({
        name: ingredient.ingredient,
        calories: parseInt(ingredient.calories, 10),
        quantity: ingredient.quantity,
        protein: parseInt(ingredient.protein, 10),
        fat: parseInt(ingredient.fat, 10),
        carbs: parseInt(ingredient.carbs, 10),
      }));
    } else {
      console.error('Data is not an array', data);
    }
  }

  onSubmitRecipe() {
    const mealData = {
      recipeName: this.recipeName,
      servings: this.servings,
      ingredients: this.ingredients
    };

    console.log('Meal data:', mealData);

    this.calorieTrackerService.addMealWithIngredients(mealData).subscribe({
      next: (response: any) => console.log('Meal and ingredients added successfully', response),
      error: (error: any) => {
      console.error('Error:', error)
      this.isError = true;}
  
    });

    console.log('Meal data:', mealData);
    // reset form
    this.recipeName = '';
    this.servings = 0;
    this.ingredients = [];
    this.selectedFile = null;
    this.isSuccess = true;
  }
}
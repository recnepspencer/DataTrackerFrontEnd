interface Ingredient {
  id: number;
  name: string;
  quantity: string;
  protein: number;
  fat: number;
  carbs: number;
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalorieTrackerService } from '../../../../../../services/calorie-tracker.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  @Input() recipe: any;  // Consider defining a type for 'recipe' as well
  @Input() isEditing: boolean = false;
  recipeForm: FormGroup = this.fb.group({  // Initialize here to ensure it's definitely assigned
    ingredients: this.fb.array([])
  });

  constructor(private fb: FormBuilder, private calorieTrackerService: CalorieTrackerService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.recipeForm = this.fb.group({
      recipeName: [this.recipe.recipe, Validators.required],
      servings: [this.recipe.servings, [Validators.required, Validators.min(1)]],
      ingredients: this.fb.array(this.recipe.ingredients.map((ing: Ingredient) => this.createIngredientGroup(ing)))
    });
  }

  createIngredientGroup(ingredient: Ingredient): FormGroup {
    return this.fb.group({
      id: [ingredient.id],
      name: [ingredient.name, Validators.required],
      quantity: [ingredient.quantity, Validators.required],
      protein: [ingredient.protein, Validators.required],
      fat: [ingredient.fat, Validators.required],
      carbs: [ingredient.carbs, Validators.required]
    });
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    const updatedMealData = {
      recipeName: this.recipeForm.value.recipeName,
      servings: this.recipeForm.value.servings,
      ingredients: this.recipeForm.value.ingredients,
    };
  
    console.log("Sending update:", updatedMealData); // Log the data being sent
  
    this.calorieTrackerService.updateMeal(this.recipe.id, updatedMealData).subscribe({
      next: (response) => {
        console.log('Meal updated successfully!', response);
        this.recipe = { ...this.recipe, ...updatedMealData };
        this.toggleEdit();  // Optionally close the edit mode
      },
      error: (error) => {
        console.error('Failed to update meal', error);
      }
    });
  }
}
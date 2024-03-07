import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalorieTrackerService {
  private apiUrl = 'http://localhost:8000/api'; // Adjust this URL to your Laravel API endpoint

  constructor(private http: HttpClient) {}

  // Existing method to add a meal with ingredients
  addMealWithIngredients(mealData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/meals`, mealData);
  }

  // New methods for additional functionalities

  // Get all meals
  getAllMeals(): Observable<any> {
    return this.http.get(`${this.apiUrl}/meals`);
  }

  // Get a single meal by id
  getMealById(mealId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/meals/${mealId}`);
  }

  // Delete a meal by id
  deleteMeal(mealId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/meals/${mealId}`);
  }

  // Update a meal by id
  updateMeal(mealId: number, mealData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/meals/${mealId}`, mealData);
  }

  // Add ingredients to a meal
  addIngredientsToMeal(mealId: number, ingredientsData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/meals/${mealId}/ingredients`,
      ingredientsData
    );
  }

  // Get all ingredients for a meal
  getIngredientsForMeal(mealId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/meals/${mealId}/ingredients`);
  }

  // Delete an ingredient by id
  deleteIngredient(ingredientId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/ingredients/${ingredientId}`);
  }

  // consumptions methods
  getAllConsumptions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/consumptions`);
  }

  getConsumptionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/consumptions/${id}`);
  }

  recordConsumption(consumptionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/consumptions`, consumptionData);
  }

  updateConsumption(id: number, consumptionData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/consumptions/${id}`, consumptionData);
  }

  deleteConsumption(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/consumptions/${id}`);
  }

  getCaloriesByDayOfWeek(): Observable<any> {
    return this.http.get(`${this.apiUrl}/calories`);
  }
  
  // Method to fetch total macro ratios for the last 7 days
  getTotalMacrosLast7Days(): Observable<any> {
    return this.http.get(`${this.apiUrl}/macros`);
  }
}

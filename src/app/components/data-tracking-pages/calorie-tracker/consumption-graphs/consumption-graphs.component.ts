import { Component, OnInit } from '@angular/core';
import { CalorieTrackerService } from '../../../../services/calorie-tracker.service';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { CommonModule } from '@angular/common';

PlotlyModule.plotlyjs = PlotlyJS;

interface CalorieData {
  day_of_week: string;
  total_calories: number;
}
interface MacroData {
  total_protein: number;
  total_fat: number;
  total_carbs: number;
}
interface MacroDataResponse extends Array<MacroData> {}

@Component({
  selector: 'app-consumption-graphs',
  templateUrl: './consumption-graphs.component.html',
  styleUrls: ['./consumption-graphs.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class ConsumptionGraphsComponent implements OnInit {
  constructor(private calorieTrackerService: CalorieTrackerService) { }

  ngOnInit() {
    this.loadCaloriesByDayOfWeek();
    this.loadTotalMacrosLast7Days();
  }

  loadCaloriesByDayOfWeek(): void {
    this.calorieTrackerService.getCaloriesByDayOfWeek().subscribe({
      next: (data) => {
        this.initCalorieChart(data);
      },
      error: (error) => console.error('Error fetching calories by day of week:', error)
    });
  }

  loadTotalMacrosLast7Days(): void {
    this.calorieTrackerService.getTotalMacrosLast7Days().subscribe({
      next: (data: MacroDataResponse) => {
        // Assuming the response always contains at least one item
        if (data.length > 0) {
          this.initMacroRatioChart(data[0]);
        }
      },
      error: (error) => console.error('Error fetching total macros last 7 days:', error)
    });
  }

  initCalorieChart(data: CalorieData[]) {
    const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
    // Prepare an array with default values for all days
    let caloriesDataForAllDays = allDays.map(day => ({
      day_of_week: day,
      total_calories: 0 // Default to 0 calories
    }));
  
    // Update the array with actual data for the days that have it
    data.forEach(dataItem => {
      const index = caloriesDataForAllDays.findIndex(item => item.day_of_week === dataItem.day_of_week);
      if (index !== -1) {
        caloriesDataForAllDays[index].total_calories = dataItem.total_calories;
      }
    });
  
    // Now, prepare the data for Plotly
    const plotData: Partial<Plotly.Data>[] = [{
      x: caloriesDataForAllDays.map(item => item.day_of_week),
      y: caloriesDataForAllDays.map(item => item.total_calories),
      type: 'bar' // Explicitly set as 'bar', not a generic string
    }];
  
    const layout = {
      title: 'Calories Consumed by Day of the Week',
      xaxis: { title: 'Day of the Week' },
      yaxis: { title: 'Total Calories' },
      // Ensure the chart displays even if a category (day) has a value of 0
      bargap: 0.05 // Adjusts the gap between bars for aesthetic preference
    };
  
    PlotlyJS.newPlot('calorie-chart', plotData, layout);
  }
  initMacroRatioChart(data: MacroData) {
    // Parsing string values to numbers
    const totalProtein = Number(data.total_protein) || 0;
    const totalFat = Number(data.total_fat) || 0;
    const totalCarbs = Number(data.total_carbs) || 0;
    
  
    const layout = {
      title: 'Macro Ratios Over Last 7 Days',
    };
  
    const plotData: { values: number[]; labels: string[]; type: 'pie'; }[] = [{
      values: [totalProtein, totalFat, totalCarbs],
      labels: ['Protein', 'Fat', 'Carbs'],
      type: 'pie'
    }];
  
    PlotlyJS.newPlot('macro-chart', plotData, layout);
  }
}
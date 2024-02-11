import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
FormsModule;
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
RouterLink
import { UserService } from '../../services/user.service';
import { UpdateWeightComponent } from './update-weight/update-weight.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet, UpdateWeightComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})

export class UserDetailsComponent implements OnInit {
  user: any = {};
  showUpdateWeight = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(
      (data) => {
        console.log('User details:', data);
        this.user = data;
      },
      (error) => {
        console.error('Failed to fetch user details', error);
      }
    );
  }

  submitWeight(): void {
    this.userService.updateWeight(this.user.weight).subscribe(
      (response) => {
        console.log('Weight updated successfully');
      },
      (error) => {
        console.error('Failed to update weight', error);
      }
    );
  }

  submitGender(): void {
    this.userService.updateGender(this.user.gender).subscribe(
      (response) => {
        console.log('Gender updated successfully');
      },
      (error) => {
        console.error('Failed to update gender', error);
      }
    );
  }

  updateWeight(newWeight: number) {
    this.userService.updateWeight(newWeight).subscribe(() => {
      this.user.weight = newWeight;
      this.showUpdateWeight = false; // Hide the update component after update
      // Handle success, perhaps refresh the user data or display a success message
    }, error => {
      // Handle error
      console.error('Error updating weight:', error);
    });
  }

}
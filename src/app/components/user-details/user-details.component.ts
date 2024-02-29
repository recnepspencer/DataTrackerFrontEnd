import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UpdateWeightComponent } from './update-weight/update-weight.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
   this.getUserData();
  }

  getUserData(): void {
    this.userService.readUserData().subscribe({
      next: this.getUserDataNext.bind(this),
      error: this.getUserDataError.bind(this)
    });
  }

  getUserDataNext(data: any) {
    console.log('User data:', data);
    this.user = data;
  }

  getUserDataError(error: any) {
    console.error('Error fetching user data:', error);
  }

  onSubmitWeight(): void {
    this.submitWeight();
  }

  submitWeight(): void {
    this.userService.createUserWeight({ weight: this.user.weight }).subscribe({
      next: this.submitWeightNext.bind(this),
      error: this.submitWeightError.bind(this)
    });
  }

  submitWeightNext(data: any) {
    console.log('Weight updated successfully', data);
  }

  submitWeightError(error: any) {
    console.error('Failed to update weight', error);
  }

  onSubmitGender(): void {
    this.submitGender();
  }

  submitGender(): void {
    this.userService.updateUserGender(this.user.id, this.user.gender).subscribe({
      next: this.submitGenderNext.bind(this),
      error: this.submitGenderError.bind(this)
    });
  }

  submitGenderNext(data: any) {
    console.log();
  }

  submitGenderError(error: any) {
    console.error('Failed', error);
  }

  showUpdateWeightDialog(): void {
    const updateWeightDialog = this.dialog.open(UpdateWeightComponent, {
      height: '200px',
      width: '400px',
      position: { top: '-30%', left: 'calc(50% - 200px)' },
      data: { currentWeight: this.user.weight },
    });
  }
}

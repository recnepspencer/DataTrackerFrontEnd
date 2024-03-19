import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [AuthService ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationData = {first_name: '', last_name: '', username: '', email: '', password: '' };
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.registrationData).subscribe({
      next: (response) => {
        console.log('Registration response:', response);
  
      },
      error: (error) => {
        console.error('Registration error:', error);
        // Handle the error here
      }
    });
  }
}
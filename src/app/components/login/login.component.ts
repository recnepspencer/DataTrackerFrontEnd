import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { RouterLink, RouterOutlet, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet],
  providers: [AuthService ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData = { username: '', password: '' };
  userData: any = null;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginData).subscribe(
      response => {
        console.log('Login response:', response);
        localStorage.setItem('access_token', response.access_token); // Correct the key based on your previous setup
        console.log(localStorage.getItem('access_token'));
        this.router.navigate(['/user-details']); // Redirect to dashboard
        this.isLoading = false; // Reset loading state
      },
      error => {
        console.error('Login error:', error);
        this.errorMessage = 'Failed to login'; // Set a user-friendly error message
        this.isLoading = false; // Reset loading state
      }
    );
  }
}
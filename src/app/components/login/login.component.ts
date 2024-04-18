import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { RouterLink, RouterOutlet, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet],
  providers: [AuthService],
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
    this.login();
  }

  login() {
    this.isLoading = true;
    this.authService.login(this.loginData).subscribe({
      next: (response) => this.loginNext(response),
      error: (error) => this.loginError(error)
    });
  }

  loginNext(response: any) {
    this.router.navigate(['/user-details']);
    this.isLoading = false;
  }

  loginError(error: any) {
    console.error('Login error:', error);
    if (error.status === 401) {
      this.errorMessage = 'Incorrect username or password, please try again';
    } else {
      this.errorMessage = 'Failed to login';
    }
    this.isLoading = false;
  }

}

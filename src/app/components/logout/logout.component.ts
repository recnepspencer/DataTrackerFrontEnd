import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { RouterLink, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet],
  providers: [AuthService],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logoutFailed = false;

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error:', error);
        this.logoutFailed = true;
        setTimeout(() => {
          this.logoutFailed = false;
        }, 5000);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../auth/auth.guard';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';
  loggedIn: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('Header component initialized');
    this.authService.userLoggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
      console.log('User logged in:', loggedIn);
    });
  }

  openMenu() {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }
  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
    this.closeMenu();
  }

  navigateToUserDetails() {
    this.router.navigate(['/user-details']);
    this.closeMenu();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
    this.closeMenu();
  }

  navigateToMealTracker() {
    this.router.navigate(['/track-calories']);
    this.closeMenu();
  }

  navigateToLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error:', error);
      },
    });
    this.closeMenu();
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
    this.closeMenu();
  }

  showLogin() {
    console.log(this.authService.userLoggedIn.value);
    this.authService.userLoggedIn.next(true);
    console.log(this.authService.userLoggedIn.value);
  }
}

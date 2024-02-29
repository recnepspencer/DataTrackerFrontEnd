import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router) {
  }

  menuValue:boolean=false;
  menu_icon :string ='bi bi-list';

  openMenu(){
    this.menuValue =! this.menuValue ;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }

  closeMenu() {
  this.menuValue = false;
  this.menu_icon = 'bi bi-list';
  }

  navigateToDashboard(){
    this.router.navigate(['/dashboard']);
    this.closeMenu()
  }

  navigateToUserDetails(){
    this.router.navigate(['/user-details']);
    this.closeMenu()
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
    this.closeMenu()
  }
}

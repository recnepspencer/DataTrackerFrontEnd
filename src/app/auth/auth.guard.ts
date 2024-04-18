import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate: CanActivateFn = (route, state) => {
    const token = localStorage.getItem('access_token');

    if (token) {
      return true; // User is authenticated, allow access
    } else {
      this.router.navigate(['/login']); // Not authenticated, redirect to login
      return false;
    }
  }
}

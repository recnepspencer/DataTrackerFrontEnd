import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SleepTrackingComponent } from './components/data-tracking-pages/sleep-tracking/sleep-tracking.component';
import {AuthGuard} from './auth/auth.guard';
import { CalorieTrackerComponent } from './components/data-tracking-pages/calorie-tracker/calorie-tracker.component';


const routeConfig: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'register', component: RegistrationComponent, title: 'Register'},
    {path: 'track/sleep', component: SleepTrackingComponent, title: 'Track Your Sleep'},
    { path: 'user-details', component: UserDetailsComponent, title: 'User Details', canActivate: [AuthGuard]},
    { path: 'dashboard', component: DashboardComponent, title: 'Dashboard', canActivate: [AuthGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'track-calories', component: CalorieTrackerComponent, title: 'Track Calories'}
];

export default routeConfig;
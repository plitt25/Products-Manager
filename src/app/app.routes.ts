import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { DashboardAdmin } from './features/dashboard-admin/dashboard-admin';
import { Students } from './features/students/students';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'admin', component: DashboardAdmin },
  { path: 'dashboard-admin', component: DashboardAdmin },
  { path: 'students', component: Students },
  { path: '**', redirectTo: '' },
];

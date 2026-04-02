import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AuthGuard } from './auth-guard';


export const routes: Routes = [
  { path: '',            redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',       component: LoginComponent },
  {
    path: 'restaurants',
    component: RestaurantsComponent,
    canActivate: [AuthGuard],   // ← protect this route
  },
  {
    path: 'menu/:id',
    component: MenuComponent,
    canActivate: [AuthGuard],   // ← protect this too
  },
  { path: '**',          redirectTo: 'login' },
];
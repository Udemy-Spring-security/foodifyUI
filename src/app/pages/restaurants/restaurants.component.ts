import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from './model/restaurant';
import { AuthService } from '@auth0/auth0-angular';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[] = [];

  isAdmin: Observable<boolean> | undefined;
  private ROLES_CLAIM = 'https://myapp.com/roles';

  constructor(private restaurantService: RestaurantService,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe(data => {
      this.restaurants = data;
    });

    this.isAdmin = this.isAdmin1();
  }

  getRoles(): Observable<string[]> {
    return this.auth.idTokenClaims$.pipe(
      map(claims => claims?.[this.ROLES_CLAIM] ?? [])
    );
  }
  isAdmin1(): Observable<boolean> {
    console.log(this.getRoles());
    return this.getRoles().pipe(
      map(roles => roles.includes('admin'))
    );
  }
  viewMenu(id: number) {
    this.router.navigate(['/menu', id]);
  }

  deleteRestaurant(id: number) {
    this.restaurantService
      .deleteRestaurant(id)
      .subscribe({

        next: (response) => {

          console.log("deleted", response);

          this.restaurants =
            this.restaurants.filter(r => r.id !== id);
        },

        error: (err) => {
          console.error("delete error", err);
        }

      });
  }
}

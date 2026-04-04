import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from './model/restaurant';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[] = [];
  isAdmin: boolean | undefined;
  constructor(private restaurantService: RestaurantService,
    private router: Router,
    private keycloak: KeycloakService) { }

  ngOnInit(): void {
    this.isAdmin = this.isAdmin1();
    this.restaurantService.getRestaurants().subscribe(data => {
      this.restaurants = data;
    });
  }

  viewMenu(id: number) {
    this.router.navigate(['/menu', id]);
  }

  isAdmin1(): boolean  {

    const token = this.keycloak.getKeycloakInstance().tokenParsed;

    const roles =
      token?.realm_access?.roles || [];

    console.log(roles);
    return roles.includes('admin');
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

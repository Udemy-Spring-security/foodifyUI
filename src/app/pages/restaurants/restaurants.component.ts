import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from './model/restaurant';


@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[] = [];
  constructor(private restaurantService: RestaurantService,
    private router: Router) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe(data => {
      this.restaurants = data;
    });
  }

  viewMenu(id: number) {
    this.router.navigate(['/menu', id]);
  }
}

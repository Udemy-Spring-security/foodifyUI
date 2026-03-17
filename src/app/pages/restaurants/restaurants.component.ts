import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
}

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [CommonModule,HeaderComponent],
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {

  restaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Pizza Palace',
      cuisine: 'Italian',
      rating: 4.5,
      image: 'pizza.jpeg'
    },
    {
      id: 2,
      name: 'Burger Hub',
      cuisine: 'American',
      rating: 4.2,
      image: 'burger.jpg'
    },
    {
      id: 3,
      name: 'Spice Villa',
      cuisine: 'Indian',
      rating: 4.7,
      image: 'spice.jpg'
    },
    {
      id: 4,
      name: 'Sushi World',
      cuisine: 'Japanese',
      rating: 4.4,
      image: 'sushi.jpg'
    }
  ];

  constructor(private router: Router) {}

  viewMenu(id: number) {
  this.router.navigate(['/menu', id]);
}
}

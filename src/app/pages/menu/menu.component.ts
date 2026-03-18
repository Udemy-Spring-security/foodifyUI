import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { RestaurantService } from '../../services/restaurant.service';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  restaurantId!: number;
  menu: MenuItem[] = [];
  orderPlaced = false;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit() {
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));

    this.restaurantService.getRestaurant(this.restaurantId)
      .subscribe(response => {

        // take menu from backend
        this.menu = response.menu.map((item: any) => ({
          ...item,
          qty: 0 // initialize qty for UI
        }));

      });
  }

  increment(item: MenuItem) {
    item.qty!++;
  }

  decrement(item: MenuItem) {
    if (item.qty! > 0) {
      item.qty!--;
    }
  }

  get cartItems() {
    return this.menu.filter(i => i.qty! > 0);
  }

  get total() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.qty! * item.price,
      0
    );
  }

  placeOrder() {
    this.orderPlaced = true;
    this.menu.forEach(item => item.qty = 0);
  }

  closePopup() {
    this.orderPlaced = false;
  }
}
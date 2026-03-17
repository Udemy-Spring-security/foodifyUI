import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';

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
export class MenuComponent {

  restaurantId!: number;

  orderPlaced = false;

  menu: MenuItem[] = [
    { id: 1, name: 'Paneer Tikka', price: 150, qty: 0 },
    { id: 2, name: 'Butter Naan', price: 50, qty: 0 },
    { id: 3, name: 'Dal Fry', price: 120, qty: 0 },
    { id: 4, name: 'Veg Biryani', price: 180, qty: 0 }
  ];

  constructor(private route: ActivatedRoute) {
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
  }

  increment(item: MenuItem) {
    item.qty++;
  }

  decrement(item: MenuItem) {
    if (item.qty > 0) {
      item.qty--;
    }
  }

  get cartItems() {
    return this.menu.filter(i => i.qty > 0);
  }

  get total() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );
  }

  placeOrder() {
    // simulate order success
    this.orderPlaced = true;

    // reset cart + quantities
    this.menu.forEach(item => (item.qty = 0));
  }

  closePopup() {
    this.orderPlaced = false;
  }
}

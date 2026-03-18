export interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  price: number;
  qty?: number; // for UI only
}
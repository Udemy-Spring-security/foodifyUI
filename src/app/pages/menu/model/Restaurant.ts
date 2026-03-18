import { MenuItem } from "./MenuItem";

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
  menu: MenuItem[];
}
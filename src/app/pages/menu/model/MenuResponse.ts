import { MenuItem } from "./MenuItem";

export interface MenuResponse {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
  menu: MenuItem[];
}
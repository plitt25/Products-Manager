import { Product } from "./product.model";

export interface CartItem {
  id: string;
  name:string;
  price: number;
  image: string;
  // Propiedad opcional para la cantidad en el carrito
  quantity?: number;
}
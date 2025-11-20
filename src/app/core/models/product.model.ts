export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  catalogId?: string;
  porcentPromo?: number;
  promo?: boolean;
  isNew?: boolean;
  createdAt?: string; 
  updatedAt?: string;
  quantity?: number;
}

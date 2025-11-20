import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product.model';
import { Products } from '../products/products';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Products],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public promoProducts: Product[] = [];
  constructor(private productService: ProductService) {}
}

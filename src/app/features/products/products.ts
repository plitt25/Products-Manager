import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { ButtonModule } from 'primeng/button';
import { switchMap, map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  public products$: Observable<Product[]>;

  constructor() {
    const productsData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const catalogId = params.get('id');
        return this.productService.getProducts().pipe(
          map((data) => {
            if (catalogId) {
              return {
                title: `Productos de ${catalogId}`,
                products: data.filter((p) => p.catalogId === catalogId),
              };
            } else {
              return {
                title: 'Promociones',
                products: data,
              };
            }
          })
        );
      }),
      shareReplay(1)
    );
    this.products$ = productsData$.pipe(map((data) => data.products));
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../core/services/admin.service';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { CatalogModel } from '../../core/models/catalog.model';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './dashboard-admin.html',
  styleUrls: ['./dashboard-admin.css'],
})
export class DashboardAdmin implements OnInit {
  public filterText = '';
  public username = '';
  public password = '';
  public loginError = '';
  public products: Product[] = [];
  public displayDialog = false;
  public editingProduct = false;
  public productForm: Partial<Product> = {
    id: undefined,
    name: '',
    price: 0,
    image: '',
    promo: false,
    porcentPromo: 0,
    catalogId: 'ropa',
    isNew: false,
  };

  public catalogs: CatalogModel[] = [];

  constructor(
    public adminService: AdminService,
    private productService: ProductService,
    private messageService: MessageService,
    private cd: ChangeDetectorRef
  ) {
  }

  get productsCount(): number {
    return this.products ? this.products.length : 0;
  }

  get promoCount(): number {
    return this.products ? this.products.filter(p => !!p.promo).length : 0;
  }

  get newCount(): number {
    return this.products ? this.products.filter(p => !!p.isNew).length : 0;
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Error cargando productos', err),
    });
  }

  public login() {
    if (this.adminService.login(this.username, this.password)) {
      this.loginError = '';
      this.loadProducts();
    } else {
      this.loginError = 'Usuario o contraseña incorrectos';
    }
  }

  public logout() {
    this.adminService.logout();
  }

  public openNew() {
    this.editingProduct = false;
    this.resetForm();
    console.log('Opening new product dialog', this.productForm);
    this.cd.detectChanges();
    this.displayDialog = true;
  }

  public resetForm() {
    this.productForm = {
      name: '',
      price: 0,
      image: '',
      promo: false,
      porcentPromo: 0,
      catalogId: 'ropa',
      isNew: true,
    };
  }

  public onPromoChange() {
    if (!this.productForm.promo) {
      this.productForm.porcentPromo = 0;
    }
  }

  public editProduct(product: Product) {
    this.editingProduct = true;
    this.productForm = { ...product };
    console.log('Editing product', this.productForm);
    this.cd.detectChanges();
    this.displayDialog = true;
  }

  public deleteProduct(product: Product) {
    if (!product.id) return;

    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p.id !== product.id);
        this.cd.detectChanges();
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Producto eliminado correctamente',
        });
      },
      error: (err) => {
        console.error('Error eliminando producto', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el producto',
        });
      },
    });
  }

  public saveProduct() {
    const data = { ...this.productForm };
    if (this.editingProduct && data.id) {
      this.productService.updateProduct(data.id, data).subscribe({
        next: (updated) => {
          const idx = this.products.findIndex((p) => p.id === updated.id);
          if (idx > -1) this.products[idx] = updated;
          this.displayDialog = false;
          this.cd.detectChanges();
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Producto actualizado correctamente',
          });
        },
        error: (err) => {
          console.error('Error actualizando producto', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el producto',
          });
        },
      });
    } else {
      this.productService.createProduct(data).subscribe({
        next: (created) => {
          this.products.push(created);
          this.displayDialog = false;
          this.cd.detectChanges();
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Producto creado correctamente',
          });
        },
        error: (err) => {
          console.error('Error creando producto', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear el producto',
          });
        },
      });
    }
  }

  public closeDialog(type: 'success' | 'error', detail: string) {
    this.displayDialog = false;
    this.messageService.add({
      severity: type,
      summary: type === 'success' ? 'Éxito' : 'Error',
      detail,
    });
    this.cd.detectChanges();
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './../../product.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  searchTerm: string = '';
  filteredProducts: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  onSearch(): void {
    if (this.searchTerm.trim().length > 0) {
      this.router.navigate(['/search-results'], { queryParams: { term: this.searchTerm } });
      this.filteredProducts = [];
    } else {
      this.filteredProducts = [];
    }
  }

  onInput(event: any): void {
    const value = event.target.value;
    if (value.trim().length > 0) {
      this.filteredProducts = this.productService.searchProducts(value);
    } else {
      this.filteredProducts = [];
    }
  }

  selectProduct(product: any): void {
    this.searchTerm = product.name;
    this.filteredProducts = [];
  }
}

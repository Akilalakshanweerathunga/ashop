import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { WishListService } from '../wish-list.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() categoryTitle: string = '';
  wishListProductIds: string[] = [];

  searchResults: any[] = [];
  searchTerm: string = '';

  filteredSearchResults: any[] = [];
  selectedCurrency: string = 'USD';

  brands: string[] = [];
  selectedBrands: string[] = [];
  inStockOnly: boolean = false;
  priceRange: number = 100000;
  sortOrder: string = 'lowToHigh';

  constructor(private productService: ProductService, private route: ActivatedRoute, private wishListService: WishListService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['term'] || '';
      if (this.searchTerm) {
        this.searchResults = this.productService.searchProducts(this.searchTerm);
        this.filteredSearchResults = [...this.searchResults];
        this.extractBrands();
      } else {
        this.searchResults = [];
        this.filteredSearchResults = [];
      }
    });
    this.wishListService.getWishList().subscribe(wishList => {
      this.wishListProductIds = wishList.map(item => item.id);
    });
  }

  addToCart(product: any) {
    this.productService.addItemToCart(product);
  }

  toggleWishList(productId: string) {
    if (this.isInWishList(productId)) {
      this.wishListService.removeItemFromWishList(productId);
    } else {
      this.wishListService.addItemToWishList(productId);
    }
  }

  isInWishList(productId: string): boolean {
    return this.wishListProductIds.includes(productId);
  }

  onBrandFilterChange(event: any) {
    const brand = event.target.value;
    if (event.target.checked) {
      this.selectedBrands.push(brand);
    } else {
      this.selectedBrands = this.selectedBrands.filter(b => b !== brand);
    }
    this.applyFilters();
  }

  extractBrands() {
    const brandsSet = new Set(this.searchResults.map(product => product.brand));
    this.brands = Array.from(brandsSet);
  }

  onStockFilterChange(event: any) {
    this.inStockOnly = event.target.checked;
    this.applyFilters();
  }

  onPriceRangeChange(event: any) {
    this.priceRange = event.target.value;
    this.applyFilters();
  }

  onSortChange(event: any) {
    this.sortOrder = event.target.value;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredSearchResults = this.searchResults.filter(product => {
      const matchesBrand = this.selectedBrands.length ? this.selectedBrands.includes(product.brand) : true;
      const matchesStock = this.inStockOnly ? product.stock : true;
      const matchesPrice = product.sellingPrice <= this.priceRange;

      return matchesBrand && matchesStock && matchesPrice;
    });

    this.sortProducts();
  }

  sortProducts() {
    if (this.sortOrder === 'lowToHigh') {
      this.filteredSearchResults.sort((a, b) => a.sellingPrice - b.sellingPrice);
    } else if (this.sortOrder === 'highToLow') {
      this.filteredSearchResults.sort((a, b) => b.sellingPrice - a.sellingPrice);
    }
  }
}

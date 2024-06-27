import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { WishListService } from '../wish-list.service';
import { CurrencyService } from './../currency-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  wishListProductIds: string[] = [];
  brands: string[] = [];
  selectedBrands: string[] = [];
  inStockOnly: boolean = false;
  priceRange: number = 100000;
  sortOrder: string = 'lowToHigh';

  @Input() categoryTitle!: string;
  categoryType: string | null = null;
  selectedCurrency: string = 'LKR. ';
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private productService: ProductService, private wishListService: WishListService,private currencyService: CurrencyService) { }

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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const type = params.get('type');
      if (type !== null) {
        this.categoryType = type;
        this.products = this.productService.getProductsByCategory(this.categoryType);
        this.categoryTitle = this.getCategoryTitle(this.categoryType);
        this.filteredProducts = [...this.products];
        this.extractBrands();
      } else {
        this.products = [];
        this.filteredProducts = [];
      }
    });
    this.subscription.add(
      this.currencyService.selectedCurrency$.subscribe(currency => {
        this.selectedCurrency = currency.code;
      })
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getCategoryTitle(type: string): string {
    switch(type) {
      case 'newArrivals':
        return 'New Arrivals Products';
      case 'hardware':
        return 'Hardware Items';
      case 'foods':
        return 'Foods';
      case 'beverages':
        return 'beverages';
      default:
        return 'Products';
    }
  }

  onBrandFilterChange(event: any) {
    const brand = event.target.value;
    if (event.target.checked) {
      this.selectedBrands.push(brand);
    } else {
      this.selectedBrands = this.selectedBrands.filter(b => b !== brand);
    }
    console.log('Selected Brands:', this.selectedBrands);
    this.applyFilters();
  }

  extractBrands() {
    const brandsSet = new Set(this.products.map(product => product.brand));
    this.brands = Array.from(brandsSet);
  }
  
  onStockFilterChange(event: any) {
    this.inStockOnly = event.target.checked;
    console.log('In Stock Only:', this.inStockOnly);
    this.applyFilters();
  }
  
  onPriceRangeChange(event: any) {
    this.priceRange = event.target.value;
    console.log('Price Range:', this.priceRange);
    this.applyFilters();
  }
  
  onSortChange(event: any) {
    this.sortOrder = event.target.value;
    console.log('Sort Order:', this.sortOrder);
    this.applyFilters();
  }
  
  applyFilters() {
    console.log('Applying Filters...');
    this.filteredProducts = this.products.filter(product => {
      const matchesBrand = this.selectedBrands.length ? this.selectedBrands.includes(product.brand) : true;
      const matchesStock = this.inStockOnly ? product.stock : true;
      const matchesPrice = product.sellingPrice <= this.priceRange;
  
      return matchesBrand && matchesStock && matchesPrice;
    });
  
    this.sortProducts();
  }
  
  sortProducts() {
    console.log('Sorting Products...');
    if (this.sortOrder === 'lowToHigh') {
      this.filteredProducts.sort((a, b) => a.sellingPrice - b.sellingPrice);
    } else if (this.sortOrder === 'highToLow') {
      this.filteredProducts.sort((a, b) => b.sellingPrice - a.sellingPrice);
    }
  }
  convertPrice(price: number): number {
    const rate = this.currencyService.getCurrencyRate(this.selectedCurrency);
    return price / rate;
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../product.service';
import { CurrencyService } from './../../currency-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-dropdown',
  templateUrl: './cart-dropdown.component.html',
  styleUrls: ['./cart-dropdown.component.css']
})
export class CartDropdownComponent implements OnInit {
  cartItems: any[] = [];
  cartCount: number = 0;
  isHovered: boolean = false;
  selectedCurrency: string = 'LKR. ';
  private subscription: Subscription = new Subscription();
  
  constructor(private productService: ProductService,private currencyService: CurrencyService) { }

  ngOnInit() {
    this.productService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.productService.cartCount$.subscribe(count => {
      this.cartCount = count;
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
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);
  }

  removeItem(item: any) {
    this.productService.removeItemFromCart(item);
  }

  increaseQuantity(item: any) {
    this.productService.increaseQuantity(item);
  }

  decreaseQuantity(item: any) {
    this.productService.decreaseQuantity(item);
  }
  
  showDropdown() {
    this.isHovered = true;
  }

  hideDropdown() {
    this.isHovered = false;
  }
  convertPrice(price: number): number {
    const rate = this.currencyService.getCurrencyRate(this.selectedCurrency);
    return price / rate;
  }
}

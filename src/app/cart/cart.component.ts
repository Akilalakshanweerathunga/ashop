import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartCount: number = 0;
  isGift = false;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.productService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
    
  }
  increaseQuantity(item: any) {
    this.productService.increaseQuantity(item);
  }

  decreaseQuantity(item: any) {
    this.productService.decreaseQuantity(item);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);
  }

  removeItem(item: any) {
    this.productService.removeItemFromCart(item);
  }

  proceedToCheckout() {
    this.productService.setIsGift(this.isGift);
    this.router.navigate(['/checkout']);
  }
  
}

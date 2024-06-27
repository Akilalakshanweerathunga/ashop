import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from './../../product.service';
import { WishListService } from './../../wish-list.service';
import { CurrencyService } from './../../currency-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  @Input() singleProduct!: any[];
  @Input() categoryTitle: string = '';
  wishListProductIds: string[] = [];
  selectedCurrency: string = 'LKR. ';
  private subscription: Subscription = new Subscription();

  constructor(private productService: ProductService, private wishListService: WishListService, private currencyService: CurrencyService) { }
  
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

  ngOnInit() {
    this.wishListService.getWishList().subscribe(wishList => {
      this.wishListProductIds = wishList.map(item => item.id);
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
  convertPrice(price: number): number {
    const rate = this.currencyService.getCurrencyRate(this.selectedCurrency);
    return price / rate;
  }

}
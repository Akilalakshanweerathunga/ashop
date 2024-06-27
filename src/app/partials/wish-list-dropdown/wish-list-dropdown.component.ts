import { Component, OnInit } from '@angular/core';
import { WishListService } from './../../wish-list.service';
import { ProductService } from './../../product.service';
import { CurrencyService } from './../../currency-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wish-list-dropdown',
  templateUrl: './wish-list-dropdown.component.html',
  styleUrls: ['./wish-list-dropdown.component.css']
})
export class WishListDropdownComponent implements OnInit {
  wishlistItems: any[] = [];
  isHovered: boolean = false;
  selectedCurrency: string = 'LKR. ';
  private subscription: Subscription = new Subscription();

  constructor(private wishListService: WishListService, private productService: ProductService,private currencyService: CurrencyService) { }

  ngOnInit() {
    this.wishListService.getWishList().subscribe(items => {
      this.wishlistItems = items;
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
  addToCart(item: any) {
    this.productService.addItemToCart(item);
  }

  removeItem(item: any) {
    this.wishListService.removeItemFromWishList(item.id);
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

import { Component, OnInit , Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { WishListService } from './../wish-list.service';
import { CurrencyService } from './../currency-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent  implements OnInit {
  product: any;
  relatedProducts: any[] = []; 
  selectedCurrency: string = 'LKR. ';
  private subscription: Subscription = new Subscription();

  wishListProductIds: string[] = [];

  constructor(
    private route: ActivatedRoute,private productService: ProductService,private wishListService: WishListService,private currencyService: CurrencyService
  ) { }

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
  increaseQuantity(item: any) {
    this.productService.increaseQuantity(item);
  }

  decreaseQuantity(item: any) {
    this.productService.decreaseQuantity(item);
  }
  loadRelatedProducts(productId: string) {
    this.relatedProducts = this.productService.getRelatedProducts(productId);
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.product = this.productService.getProductById(productId);
        this.loadRelatedProducts(productId);
      }
    });

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
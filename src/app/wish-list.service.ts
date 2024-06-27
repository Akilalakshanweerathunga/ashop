import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { map } from 'rxjs/operators';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private wishList: any[];
  private wishListSubject = new BehaviorSubject<any[]>([]);

  constructor(
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.wishList = this.loadWishListFromStorage();
    this.wishListSubject.next(this.wishList);
  }

  getWishList() {
    return this.wishListSubject.asObservable();
  }

  addItemToWishList(productId: string) {
    if (this.wishList.some(item => item.id === productId)) {
      console.log(`Product with ID ${productId} is already in the wishlist.`);
      return;
    }

    const product = this.productService.getProductById(productId);
    if (product) {
      this.wishList.push(product);
      this.updateLocalStorage();
      this.wishListSubject.next(this.wishList);
      console.log(`Product with ID ${productId} added to wishlist.`);
    } else {
      console.log(`Product with ID ${productId} not found in available products.`);
    }
  }

  removeItemFromWishList(productId: string) {
    this.wishList = this.wishList.filter(item => item.id !== productId);
    this.updateLocalStorage();
    this.wishListSubject.next(this.wishList);
    console.log(`Product with ID ${productId} removed from wishlist.`);
  }

  getWishListCount() {
    return this.wishListSubject.asObservable().pipe(
      map(wishList => wishList.length)
    );
  }

  private loadWishListFromStorage(): any[] {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const storedWishList = localStorage.getItem('wishList');
        return storedWishList ? JSON.parse(storedWishList) : [];
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
        return [];
      }
    } else {
      console.warn('localStorage is not available. Using in-memory wishlist.');
      return [];
    }
  }

  private updateLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('wishList', JSON.stringify(this.wishList));
      } catch (error) {
        console.error('Error updating localStorage:', error);
      }
    } else {
      console.warn('localStorage is not available. Cannot update wishlist.');
    }
  }
}

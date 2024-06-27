import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private cartItems: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  private isGiftSubject = new BehaviorSubject<boolean>(false);
  private searchResultsSubject = new BehaviorSubject<any[]>([]);

  searchResults$ = this.searchResultsSubject.asObservable();
  isGift$ = this.isGiftSubject.asObservable();
  cartCount$ = this.cartCount.asObservable();
  cartItems$ = this.cartItemsSubject.asObservable();

  newArrivals = [
    {
      id: 'n1',
      type: 'newArrivals',
      productcode:'ap001',
      brand: 'HP',
      name: 'HP Laptop',
      image: 'https://cdn.buyabans.com/media/catalog/product/cache/fb70dacd4b4f976b0da254655d582a94/n/e/new_pbgt67roject.png',
      sellingPrice: 50000,
      originalPrice: 799000,
      stock: true
    },
    {
      id: 'n2',
      type: 'newArrivals',
      productcode:'ap002',
      brand: 'HP',
      name: 'HP Laptop',
      image: 'https://cdn.buyabans.com/media/catalog/product/cache/fb70dacd4b4f976b0da254655d582a94/n/e/new_pbgt67roject.png',
      sellingPrice: 50000,
      originalPrice: 799000,
      stock: true
    },
    {
      id: 'n3',
      type: 'newArrivals',
      productcode:'ap003',
      brand: 'HP',
      name: 'HP Laptop',
      image: 'https://cdn.buyabans.com/media/catalog/product/cache/fb70dacd4b4f976b0da254655d582a94/n/e/new_pbgt67roject.png',
      sellingPrice: 50000,
      originalPrice: 799000,
      stock: true
    },
    {
      id: 'n4',
      type: 'newArrivals',
      productcode:'ap004',
      brand: 'HP',
      name: 'HP Laptop',
      image: 'https://cdn.buyabans.com/media/catalog/product/cache/fb70dacd4b4f976b0da254655d582a94/n/e/new_pbgt67roject.png',
      sellingPrice: 50000,
      originalPrice: 799000,
      stock: true
    },
    {
      id: 'n5',
      type: 'newArrivals',
      productcode:'ap005',
      brand: 'HP',
      name: 'HP Laptop',
      image: 'https://cdn.buyabans.com/media/catalog/product/cache/fb70dacd4b4f976b0da254655d582a94/n/e/new_pbgt67roject.png',
      sellingPrice: 50000,
      originalPrice: 799000,
      stock: true
    },
    {
      id: 'n6',
      type: 'newArrivals',
      productcode:'ap006',
      brand: 'HP',
      name: 'HP Laptop last',
      image: 'https://cdn.buyabans.com/media/catalog/product/cache/fb70dacd4b4f976b0da254655d582a94/n/e/new_pbgt67roject.png',
      sellingPrice: 50000,
      originalPrice: 799000,
      stock: true
    },
  ];
  hardware = [
    {
      id: 'h1',
      type: 'hardware',
      productcode:'aph001',
      brand: 'Tokiyo Super',
      name: 'Cement Bag',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3taE_JoktoKM-aQNw7y6MWpWQyMvEYbGeiw&s',
      sellingPrice: 2700,
      originalPrice: 2300,
      stock: true
    },
    {
      id: 'h2',
      type: 'hardware',
      productcode:'aph002',
      brand: 'JEGONFRI',
      name: ' Nails for Wood - 60pcs, 3 Inches Long',
      image: 'https://m.media-amazon.com/images/I/513UcjkBcSL._AC_SL1500_.jpg',
      sellingPrice: 4867,
      originalPrice: null,
      stock: true
    },
    {
      id: 'h3',
      type: 'hardware',
      productcode:'aph003',
      brand: 'Tokiyo Super',
      name: 'Cement Bag',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3taE_JoktoKM-aQNw7y6MWpWQyMvEYbGeiw&s',
      sellingPrice: 2700,
      originalPrice: 2300,
      stock: true
    },
    {
      id: 'h4',
      type: 'hardware',
      productcode:'aph004',
      brand: 'JEGONFRI',
      name: ' Nails for Wood - 60pcs, 3 Inches Long',
      image: 'https://m.media-amazon.com/images/I/513UcjkBcSL._AC_SL1500_.jpg',
      sellingPrice: 4867,
      originalPrice: null,
      stock: true
    },
    {
      id: 'h5',
      type: 'hardware',
      productcode:'aph005',
      brand: 'Tokiyo Super',
      name: 'Cement Bag',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3taE_JoktoKM-aQNw7y6MWpWQyMvEYbGeiw&s',
      sellingPrice: 2700,
      originalPrice: 2300,
      stock: true
    },
    {
      id: 'h6',
      type: 'hardware',
      productcode:'aph006',
      brand: 'JEGONFRI',
      name: ' Nails for Wood - 60pcs, 3 Inches Long',
      image: 'https://m.media-amazon.com/images/I/513UcjkBcSL._AC_SL1500_.jpg',
      sellingPrice: 4867,
      originalPrice: null,
      stock: true
    },
  ];
  foods = [
    {
      id: 'f1',
      productcode:'apf001',
      type: 'foods',
      brand: 'TATA',
      name: 'Salt',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLwPlgUFp3jIbwi_x9uJyVj0lvbuEbVrdHww&s',
      sellingPrice: 100,
      originalPrice: null,
      stock: true
    },
    {
      id: 'f2',
      productcode:'apf002',
      type: 'foods',
      brand: 'Prima',
      name: 'Prima Noodles Kottu Mee Hot & Spicy 80G',
      image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/115293--01--1555691155.webp',
      sellingPrice: 130,
      originalPrice: null,
      stock: true
    },
    {
      id: 'f3',
      productcode:'apf003',
      type: 'foods',
      brand: 'MEADOWLEA',
      name: 'Meadowlea Spread 500G',
      image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/100617--01--1646542689.webp',
      sellingPrice: 895,
      originalPrice: null,
      stock: true
    },
    {
      id: 'f4',
      productcode:'apf004',
      type: 'foods',
      brand: 'WATAWALA',
      name: 'Watawala Tea 200G',
      image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/100511--01--1655351318.webp',
      sellingPrice: 260,
      originalPrice: null,
      stock: true
    },
    {
      id: 'f5',
      productcode:'apf005',
      type: 'foods',
      brand: 'Glomark',
      name: 'Glomark Wheat Flour 1Kg',
      image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/123163--01--1680492493.webp',
      sellingPrice: 100,
      originalPrice: null,
      stock: true
    },
    {
      id: 'f6',
      productcode:'apf006',
      type: 'foods',
      brand: 'MUNCHEE',
      name: 'Munchee Biscuit Milk Short Cake 200G',
      image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/114833--01--1623926504.webp',
      sellingPrice: 230,
      originalPrice: null,
      stock: false
    },
  ];
  beverages = [
    {
      id: 'b1',
      productcode:'apb001',
      type: 'beverages',
      brand: 'pepsi',
      name: 'Pepsi',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1gvlooSg2P9HdxsM7apEkBxoSjeZWnJ_vlg&s',
      sellingPrice: 150,
      originalPrice: null,
      stock: true
    },
    {
      id: 'b2',
      productcode:'apb002',
      type: 'beverages',
      brand: 'coka-cola',
      name: 'coca-cola',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEl86IXsu3RmCYiz7vip_s5ZF9R-IcDx2uOSwnBh_AJ00Y5zp_aeE1nMuqO34KzdlHhiA&usqp=CAU',
      sellingPrice: 150,
      originalPrice: null,
      stock: false
    },
    {
      id: 'b3',
      productcode:'apb003',
      type: 'beverages',
      brand: 'Elephant house',
      name: 'necto',
      image: 'https://www.elephanthouse.lk/images/site-specific/beverages/product-images/available-sizes-necto/necto-500ml.png',
      sellingPrice: 150,
      originalPrice: null,
      stock: true
    },
    {
      id: 'b4',
      productcode:'apb004',
      type: 'beverages',
      brand: 'Sprite house',
      name: 'Sprite',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIvgKXXCNLi8gJvAojsar8NoZlCqfGInNx5Q&s',
      sellingPrice: 150,
      originalPrice: null,
      stock: true
    },
    {
      id: 'b5',
      productcode:'apb004',
      type: 'beverages',
      brand: 'Elephant house',
      name: 'Ginger beer',
      image: 'https://www.elephanthouse.lk/images/site-specific/beverages/product-images/egb.png',
      sellingPrice: 150,
      originalPrice: null,
      stock: true
    },
    {
      id: 'b6',
      productcode:'apb006',
      type: 'beverages',
      brand: 'Elephant house',
      name: 'Cream soda',
      image: 'https://www.elephanthouse.lk/images/site-specific/beverages/product-images/cream400ml.png',
      sellingPrice: 150,
      originalPrice: null,
      stock: true
    },
  ];

  
  constructor() {
    if (this.isBrowser()) {
      this.loadCartState();
    }
    
  }

  sendNumber(count: number) {
    this.cartCount.next(count);
  }

  addItemToCart(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      item.quantity = 1;
      this.cartItems.push(item);
    }
    this.updateCartState();
  }

  removeItemFromCart(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    this.updateCartState();
  }

  increaseQuantity(item: any) {
    const cartItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (cartItem) {
      cartItem.quantity += 1;
      this.updateCartState();
    }
  }

  decreaseQuantity(item: any) {
    const cartItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      this.updateCartState();
    } else if (cartItem && cartItem.quantity === 1) {
      this.removeItemFromCart(cartItem);
    }
  }
  setIsGift(isGift: boolean) {
    this.isGiftSubject.next(isGift);
  }

  private updateCartState() {
    const totalCount = this.cartItems.reduce((count, item) => count + item.quantity, 0);
    this.cartCount.next(totalCount);
    this.cartItemsSubject.next([...this.cartItems]);
    if (this.isBrowser()) {
      this.saveCartState();
    }
  }

  private saveCartState() {
    if (this.isBrowser()) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  private loadCartState() {
    if (this.isBrowser()) {
      const savedCartItems = localStorage.getItem('cartItems');
      if (savedCartItems) {
        this.cartItems = JSON.parse(savedCartItems);
        this.updateCartState();
      }
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getProductById(id: string) {
    const allProducts = [...this.newArrivals, ...this.hardware, ...this.foods, ...this.beverages];
    return allProducts.find(product => product.id === id);
  }
  getRelatedProducts(productId: string): any[] {
    const allProducts = [...this.newArrivals, ...this.hardware, ...this.foods, ...this.beverages];
    const currentProduct = allProducts.find(product => product.id === productId);
    if (!currentProduct) {
      return [];
    }

    let relatedProducts: any[] = [];

    switch (currentProduct.type) {
      case 'newArrivals':
        relatedProducts = this.newArrivals.filter(product => product.id !== productId);
        break;
      case 'hardware':
        relatedProducts = this.hardware.filter(product => product.id !== productId);
        break;
      case 'foods':
        relatedProducts = this.foods.filter(product => product.id !== productId);
        break;
      case 'beverages':
        relatedProducts = this.beverages.filter(product => product.id !== productId);
        break;
      default:
        relatedProducts = [];
        break;
    }

    return relatedProducts.slice(0, 4);
  }
  getProductsByCategory(categoryType: string): any[] {
    switch (categoryType) {
      case 'newArrivals':
        return this.newArrivals;
      case 'hardware':
        return this.hardware;
      case 'foods':
        return this.foods;
      case 'beverages':
        return this.beverages;
      default:
        return [];
    }
  }

  getAllProducts(): any[] {
    return [...this.newArrivals, ...this.hardware, ...this.foods, ...this.beverages];
  }

  searchProducts(term: string): any[] {
    term = term.toLowerCase();
    return this.getAllProducts().filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term) ||
      product.type.toLowerCase().includes(term)
    );
  }
}

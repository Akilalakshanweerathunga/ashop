import { Component, OnInit, ElementRef, Renderer2, EventEmitter, Output, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProductService } from '../product.service';
import { WishListService } from '../wish-list.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('rotateIcon', [
      state('sliders', style({ transform: 'rotate(0deg)' })),
      state('close', style({ transform: 'rotate(180deg)' })),
      transition('sliders <=> close', [
        animate('0.3s ease-in-out')
      ]),
    ])
  ]
})
export class NavbarComponent implements OnInit {
  sidebarVisible: boolean = false;
  isSidebarToggled: boolean = false;
  selectedCategory: string = '';
  selectedBrand: string = '';
  selectedOffer: string = '';
  cartCount: number = 0;
  wishListCount: number = 0;
  selectedCurrency: string = 'LKR. '; 

  categoryDropdownItems = [
    { text: 'All categories', link: ['/']  },
    { text: 'New Arrivals', link: ['/category', 'newArrivals'] },
    { text: 'Foods', link: ['/category', 'foods'] },
    { text: 'beverages', link: ['/category', 'beverages'] },
    { text: 'Hardware', link: ['/category', 'hardware'] }

  ];
  
  brandDropdownItems = [
    { text: 'All Brands', link: ['/brand']  },
    { text: 'Samsung', link: ['/brand'] },
    { text: 'Nike', link: ['/brand'] },
    { text: 'Penguin Books', link: ['/brand'] }
  ];
  
  offersDropdownItems = [
    { text: 'Today Offers' },
    { text: '20% off Electronics', link: ['/offers', 'electronics-20-off'] },
    { text: 'Buy one get one free on Shoes', link: ['/offers', 'bogo-shoes'] },
    { text: '50% off bestsellers', link: ['/offers', 'bestsellers-50-off'] }
  ];

  constructor(private elRef: ElementRef, private renderer: Renderer2, private productService: ProductService, private wishListService: WishListService, private router: Router) {
  }
  ngOnInit(): void {
    const sidebarWrapper = this.elRef.nativeElement.querySelector('#sidebar-wrapper');
    this.renderer.addClass(sidebarWrapper, 'icons');


    this.productService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.wishListService.getWishListCount().subscribe(count => {
      this.wishListCount = count;
    });
    this.updateSelectedValues();
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
    this.isSidebarToggled = !this.isSidebarToggled;

    const sidebarWrapper = this.elRef.nativeElement.querySelector('#sidebar-wrapper');

    if (this.sidebarVisible) {
      this.renderer.removeClass(sidebarWrapper, 'icons');
    } else {
      this.renderer.addClass(sidebarWrapper, 'icons');
    }
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
  }

  onBrandSelected(brand: string): void {
    this.selectedBrand = brand;
  }

  onOfferSelected(offer: string): void {
    this.selectedOffer = offer;
  }

  @Output() selectedCurrencyChange = new EventEmitter<string>();

  updateCurrency(event: any): void {
    const selectedCurrency: string = event.target.value;
    this.selectedCurrency = selectedCurrency;
    this.selectedCurrencyChange.emit(selectedCurrency);
  }
  
  onItemSelected(item: string) {
    console.log('Selected item:', item);
  }
  onSearch(searchTerm: string): void {
    this.productService.searchProducts(searchTerm);
  }

  updateSelectedValues(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/category/')) {
      this.selectedCategory = currentUrl.split('/category/')[1];
    } else if (currentUrl.includes('/brand')) {
      this.selectedBrand = currentUrl.split('/brand')[1] || 'All Brands';
    } else if (currentUrl.includes('/offers/')) {
      this.selectedOffer = currentUrl.split('/offers/')[1];
    }
  }
}


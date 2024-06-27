import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  selectedCurrency: string = 'LKR.';

  newArrivals: any[] = [];
  hardware: any[] = [];
  foods: any[] = [];
  beverages: any[] = [];

  bannerImages: string[] = [
    './assets/img/banner.jpg',
    './assets/img/banner.jpg',
    './assets/img/banner.jpg'
  ];

  constructor(private productService: ProductService) { } 

  ngOnInit() {
    this.newArrivals = this.getLastProducts(this.productService.newArrivals, 6);
    this.hardware = this.getLastProducts(this.productService.hardware, 6);
    this.foods = this.getLastProducts(this.productService.foods, 6);
    this.beverages = this.getLastProducts(this.productService.beverages, 6);

  }

  private getLastProducts(products: any[], count: number): any[] {
    return products.slice(-count).reverse();
  }
}

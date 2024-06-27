import { Component, OnInit  } from '@angular/core';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.css']
})
export class ProductCarouselComponent implements OnInit  {
  activeSlides?: SlidesOutputData;
  isLoading = true; 

  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
    console.log(this.activeSlides);
  }

  dynamicSlides = [
    {
      id: '1',
      src: 'https://c8.alamy.com/comp/2PC2PE3/shopping-basket-full-of-construction-materials-and-tools-with-calculator-3d-illustration-2PC2PE3.jpg',
      alt: 'Hardware',
      title: 'Hardware Items',
      type: 'hardware'
    },
    {
      id: '2',
      src: 'https://i.pinimg.com/originals/90/bc/0c/90bc0c906fc30587b4863d0e6089f364.jpg',
      alt: 'Foods',
      title: 'Food items',
      type: 'foods'
    },
    {
      id: '3',
      src: 'https://c8.alamy.com/comp/WX0H55/bottles-of-global-soft-drink-brands-including-products-of-coca-cola-company-and-pepsico-WX0H55.jpg',
      alt: 'Beverage',
      title: 'Beverage Items',
      type: 'beverages'
    },
    {
      id: '4',
      src: 'https://i.pinimg.com/736x/ba/c1/6e/bac16e9df93c7eeff7ad9268bbb4ad1c.jpg',
      alt: 'Electronics',
      title: 'Electronic Items',
      type: 'electronic'
    },
    {
      id: '5',
      src: 'https://img.freepik.com/free-vector/modern-new-arrival-composition-with-realistic-design_23-2147882903.jpg',
      alt: 'New arrived',
      title: 'New Arrived',
      type: 'newArrivals'
    },
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      760: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
    nav: true,
  };
  ngOnInit() {
    this.loadSlides();
  }

  loadSlides() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); 
  }
  startDragging(event: any) {
    console.log(event);
  }
}

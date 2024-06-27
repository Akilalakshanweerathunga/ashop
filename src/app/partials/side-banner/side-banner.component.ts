import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-banner',
  templateUrl: './side-banner.component.html',
  styleUrls: ['./side-banner.component.css']
})
export class SideBannerComponent implements OnInit {
  currentSlide = 0;
  slides = [
    'https://images.unsplash.com/photo-1574175676245-7d8f82632eae?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    'https://images.unsplash.com/photo-1504145269610-ffaef1902a64?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
  ];

  ngOnInit() {
    this.init(this.currentSlide);
    setInterval(() => this.next(), 5000);
  }

  init(n: number) {
    this.currentSlide = n;
  }

  next() {
    this.currentSlide = (this.currentSlide >= this.slides.length - 1) ? 0 : this.currentSlide + 1;
  }

  prev() {
    this.currentSlide = (this.currentSlide <= 0) ? this.slides.length - 1 : this.currentSlide - 1;
  }
}

import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ProductService } from './../product.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { trigger, state, style, animate, transition} from '@angular/animations';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [
    trigger('collapseExpand', [
      state('collapsed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  isGift = false;
  giftMessage = '';
  currentDate = new Date();
  isOrderSummaryShown: boolean = false;
  shipping = 350;
  toggleOrderSummary() {
    this.isOrderSummaryShown = !this.isOrderSummaryShown;
  }

  constructor(private productService: ProductService) { 
  }
  ngOnInit() {
    this.productService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.productService.isGift$.subscribe(isGift => {
      this.isGift = isGift;
    });
  }

  increaseQuantity(item: any) {
    this.productService.increaseQuantity(item);
  }

  decreaseQuantity(item: any) {
    this.productService.decreaseQuantity(item);
  }
  removeItem(item: any) {
    this.productService.removeItemFromCart(item);
  }


  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);
  }
  
  @ViewChild('bill', { static: false }) billElement!: ElementRef<any>;

  exportAsPDF() {
    if (this.billElement) {
      html2canvas(this.billElement.nativeElement).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg');

        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('bill.pdf');
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './../../currency-service.service';

@Component({
  selector: 'app-currency-dropdown',
  templateUrl: './currency-dropdown.component.html',
  styleUrls: ['./currency-dropdown.component.css']
})
export class CurrencyDropdownComponent implements OnInit {
  currencies = this.currencyService.getCurrencies();
  selectedCurrency = this.currencies[0].code;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {}

  onCurrencyChange(event: any) {
    const selectedCurrency = event.target.value;
    this.currencyService.setSelectedCurrency(selectedCurrency);
  }
}

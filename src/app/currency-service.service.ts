import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencies = [
    { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs.', rate: 1 },
    { code: 'USD', name: 'United States Dollar', symbol: '$', rate: 310 },
  ];

  private selectedCurrencySubject = new BehaviorSubject(this.getInitialCurrency());
  selectedCurrency$ = this.selectedCurrencySubject.asObservable();

  constructor() {}

  getCurrencies() {
    return this.currencies;
  }

  getCurrencyRate(code: string): number {
    const currency = this.currencies.find(c => c.code === code);
    return currency ? currency.rate : 1;
  }

  getCurrencySymbol(code: string): string {
    const currency = this.currencies.find(c => c.code === code);
    return currency ? currency.symbol : '';
  }

  setSelectedCurrency(code: string) {
    const currency = this.currencies.find(c => c.code === code);
    if (currency) {
      this.selectedCurrencySubject.next(currency);
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('selectedCurrency', JSON.stringify(currency));
      }
    }
  }

  private getInitialCurrency() {
    if (this.isLocalStorageAvailable()) {
      const savedCurrency = localStorage.getItem('selectedCurrency');
      return savedCurrency ? JSON.parse(savedCurrency) : this.currencies[0];
    }
    return this.currencies[0];
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}

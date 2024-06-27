import { Component} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  sidebarItems = [
    { routerLink: '/home', name: 'Home', imageClass: 'bi bi-house' },
    { routerLink: '/about', name: 'About', imageClass: 'bi bi-info-circle' },
  ];

  filters = [
    { id: 'ciment', label: 'Ciment' },
    { id: 'bars', label: 'Bars' },
  ];

  selectedPriceSorting: string = 'lowToHigh'; 

  onPriceSortingChange(sortingOption: string) {
    this.selectedPriceSorting = sortingOption;
  }

}

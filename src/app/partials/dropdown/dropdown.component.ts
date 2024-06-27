import { Component, EventEmitter, Input, Output } from '@angular/core';

interface DropdownItem {
  text: string;
  link?: any[];
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  @Input() dropdownItems!: DropdownItem[];
  @Output() itemSelected = new EventEmitter<string>();

  constructor() { }

  selectItem(itemText: string, link?: any[]) {
    this.itemSelected.emit(itemText);
    if (link) {
    }
  }
}

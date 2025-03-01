import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-menu-item',
  imports: [CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
})
export class MenuItemComponent {
  @Input() item: any;
  @Input() customizations: string[] = [];
  selectedCustomizations: { [key: string]: boolean } = {};
  showDropdown = false;
  formatCurrency(amount: number): string {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }

  constructor(private cartService: CartService) {}
  /*addtoCart(): void {
    this.cartService.addToCart(this.item);
  }
    */
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    console.log(this.selectedCustomizations);
  }
  toggleCustomization(customization: string): void {
    this.selectedCustomizations[customization] =
      !this.selectedCustomizations[customization];
    console.log(this.selectedCustomizations[customization]);
  }
  onCustomizationChange(event: Event): void {
    const target = (event.target as HTMLSelectElement) || null;
    const selectedValue = target?.value;
    if (selectedValue) {
      this.toggleCustomization(selectedValue);
    }
  }
  addToCart(): void {
    const itemToAdd = {
      ...this.item,
      selectedCustomizations: { ...this.selectedCustomizations },
      priceId: this.item.priceId,
    };
    this.cartService.addToCart(itemToAdd);
    console.log('add to cart logging itemToAdd');
    
    console.log(itemToAdd);
  }
}

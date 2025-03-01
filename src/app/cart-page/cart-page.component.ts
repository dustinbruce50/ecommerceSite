import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit{
  cartItems: any[] = [];
  cartTotal: number = 0;
  constructor(private cartService: CartService){
  
  }
  formatCurrency(amount: number): string {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }
  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    console.log("cart page logging cart items:")
    console.log(this.cartItems)
    this.cartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    });
  }
  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item)
  }

  

}

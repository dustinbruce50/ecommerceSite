import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  private cartTotal = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();
  cartTotal$ = this.cartTotal.asObservable();

  constructor(){
    this.loadCart();
  }
  addToCart(item: any): void {
    console.log("cart services loggingg cart before")
    console.log(this.cart)
    this.cart.push(item);
    console.log("Cart services add to cart logging item")
    console.log(item)
    console.log("cart services loggingg cart after")
    console.log(this.cart)

    this.saveCart();
    this.cartCount.next(this.cart.length);
    this.cartTotal.next(this.calculateTotal());
  }
  removeFromCart(item: any): void {
    let temp = this.cart.indexOf(item);
    if(temp > -1){
      this.cart.splice(temp, 1);
    }
    this.saveCart();
    this.cartCount.next(this.cart.length);
    this.cartTotal.next(this.calculateTotal());
    
  }
  getCart(): any[] {
    this.loadCart()
    console.log("get cart logging cart")
    console.log(this.cart)
    return this.cart;
  }
  clearCart(): void {
    this.cart = [];
  }
  getCartCount(): number {
    return this.cart.length;
  }
  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  private loadCart(): void {
    const storedCart = localStorage.getItem('cart');
    if(storedCart){
      this.cart=JSON.parse(storedCart)
    }
    this.cartCount.next(this.cart.length);
    this.cartTotal.next(this.calculateTotal())
  }
  private calculateTotal(): number {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }

}

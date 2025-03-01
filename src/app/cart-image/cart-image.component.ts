import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-image.component.html',
  styleUrl: './cart-image.component.css'
})
export class CartImageComponent {
  @Input() cartCount: number = 0;
  growShake: boolean = false;
  constructor (private cartService: CartService){}
  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
      this.triggerAnimation();
    })
  }
  triggerAnimation(){
    this.growShake=true;
    setTimeout(() => {
      this.growShake = false;
    }, 600);
  }
  resetAnimation(){
    this.growShake = false;
  }
}

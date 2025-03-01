import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { CartImageComponent } from '../cart-image/cart-image.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, CartImageComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartCount: number = 0;
  

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
  

}

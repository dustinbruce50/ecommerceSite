import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { CartService } from './services/cart.service';
import {NgxStripeModule} from "ngx-stripe";
import { NgModule } from '@angular/core';
import { CartImageComponent } from './cart-image/cart-image.component';



@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, NavbarComponent,NgxStripeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ecommerceSite';
}


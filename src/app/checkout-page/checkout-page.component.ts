import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxStripeModule } from 'ngx-stripe';
import {
  StripeFactoryService,
  StripeInstance,
  StripeService,
} from 'ngx-stripe';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

interface IStripeSession {
  id: string;
}

@Component({
  selector: 'app-checkout-page',
  imports: [CommonModule, NgxStripeModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent implements OnInit {
  //private key: any = process.env["PUBLISHABLE_KEY_STRIPE"];
  public stripe!: StripeInstance;
  public stripeAmount!: number;
  isLoading: boolean = false;
  cartItems: any[] = [];
  cartTotal: number = 0;

  formatCurrency(amount: number): string {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private stripeFactory: StripeFactoryService
  ) {}

  ngOnInit(): void {
    const key =
      'pk_test_51Qj7oAEsUAL5Kgd3H4R0PpES3UVvcN6nHdp9or3vzyyerZ5YuOqoVTEOnEtVPiNGKWPk4kxyXtZIsd9GycyCKCXn00rQzA1mdn';
    this.cartItems = this.cartService.getCart();
    console.log('from checkout init');
    console.log(this.cartItems);
    this.cartService.cartTotal$.subscribe((total) => {
      this.cartTotal = total;
    });
    this.stripe = this.stripeFactory.create(key);
    this.stripeAmount = 100;
  }
  async checkout() {
    this.isLoading = true;
    const host = 'http://localhost:4242';

    const items = this.cartItems.map((item) => ({
      priceId: item.priceId,
      quantity: 1,
    }));
    console.log('client checkout array check:');
    console.log(Array.isArray(items));
    this.http
      .post(
        host + '/create-checkout-session',
        { items },
        //{ data: { amount: this.stripeAmount * 100 } },
        { observe: 'response' }
      )
      .pipe(
        switchMap((response: HttpResponse<Object>) => {
          const session: IStripeSession = response.body as IStripeSession;
          return this.stripe.redirectToCheckout({ sessionId: session.id });
        })
      )
      .subscribe((result) => {
        if (result.error) {
          console.log(result.error);
        }
      });

    console.log('Client logging items:');
    console.log(items);
  }
}

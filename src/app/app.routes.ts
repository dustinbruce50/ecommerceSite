import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'cart', component: CartPageComponent},
    {path: 'checkout', component: CheckoutPageComponent},
    {path: '**', redirectTo: ''},
];

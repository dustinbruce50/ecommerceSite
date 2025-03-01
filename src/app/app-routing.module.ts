import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';

const routes: Routes = [
  { path: '', component: MainComponent }, // Home route
  { path: 'menu', component: MenuComponent }, // Menu route
  {path: 'cart', component: CartPageComponent},
  {path: 'checkout', component: CheckoutPageComponent},
  { path: '**', redirectTo: '' }, // Fallback route
];
@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}

import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { CartService } from './services/cart.service';
import { NgxStripeModule } from 'ngx-stripe';
import { NgModule } from '@angular/core';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), CartService, 
    importProvidersFrom(NgxStripeModule.forRoot("pk_test_51Qj7oAEsUAL5Kgd3H4R0PpES3UVvcN6nHdp9or3vzyyerZ5YuOqoVTEOnEtVPiNGKWPk4kxyXtZIsd9GycyCKCXn00rQzA1mdn"))
  ],
  
};

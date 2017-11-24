import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF, Location } from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderComponent } from './order/order.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsService } from './products.service';

import { ApiServiceComponent } from './api-service/api-service';

// Application routes
const appRoutes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: HomeComponent },
  { path: 'produits', component: ProductsComponent },
  { path: 'produits/:id', component: ProductComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'panier', component: ShoppingCartComponent },
  { path: 'commande', component: OrderComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    ContactComponent,
    ShoppingCartComponent,
    OrderComponent,
    ConfirmationComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    
  ],
  providers: [
    ProductsService,
    ApiServiceComponent,
    { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

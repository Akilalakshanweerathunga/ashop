import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CategoryComponent } from './category/category.component';
import { SearchResultsComponent } from './search-results/search-results.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: ProductViewComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'category/:type', component: CategoryComponent },
  { path: 'search-results', component: SearchResultsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

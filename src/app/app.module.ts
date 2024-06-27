import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import {MatButtonModule} from '@angular/material/button';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { BannerViewComponent } from './partials/banner-view/banner-view.component';
import { AboutComponent } from './about/about.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { CookiePolicyComponent } from './policy/cookie-policy/cookie-policy.component';
import { PrivacyPolicyComponent } from './policy/privacy-policy/privacy-policy.component';
import { ReturnAndExchangePolicyComponent } from './policy/return-and-exchange-policy/return-and-exchange-policy.component';
import { TermsAndConditionsComponent } from './policy/terms-and-conditions/terms-and-conditions.component';
import { PaymentOptionsComponent } from './payment-options/payment-options.component';
import { CartComponent } from './cart/cart.component';
import { BreadcrumComponent } from './navbar/breadcrum/breadcrum.component';
import { LoginModalComponent } from './modal/login-modal/login-modal.component';
import { SignupModalComponent } from './modal/signup-modal/signup-modal.component';
import { CurrencyDropdownComponent } from './partials/currency-dropdown/currency-dropdown.component';
import { MainBannerComponent } from './partials/main-banner/main-banner.component';
import { SideBannerComponent } from './partials/side-banner/side-banner.component';
import { SearchbarComponent } from './partials/searchbar/searchbar.component';
import { DropdownComponent } from './partials/dropdown/dropdown.component';
import { SingleProductComponent } from './partials/single-product/single-product.component';

import { ProductService } from './product.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductCarouselComponent } from './partials/product-carousel/product-carousel.component';
import { CartDropdownComponent } from './partials/cart-dropdown/cart-dropdown.component';
import { CheckoutComponent } from './checkout/checkout.component'; 
import { AuthService } from './auth.service';
import { CategoryComponent } from './category/category.component';
import { WishListDropdownComponent } from './partials/wish-list-dropdown/wish-list-dropdown.component'; 
import { WishListService } from './wish-list.service';
import { BrandComponent } from './brand/brand.component';
import { SearchResultsComponent } from './search-results/search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ProductViewComponent,
    BannerViewComponent,
    AboutComponent,
    ScrollToTopComponent,
    CookiePolicyComponent,
    PrivacyPolicyComponent,
    ReturnAndExchangePolicyComponent,
    TermsAndConditionsComponent,
    PaymentOptionsComponent,
    CartComponent,
    BreadcrumComponent,
    LoginModalComponent,
    SignupModalComponent,
    CurrencyDropdownComponent,
    MainBannerComponent,
    SideBannerComponent,
    SearchbarComponent,
    DropdownComponent,
    SingleProductComponent,
    NotFoundComponent,
    ProductCarouselComponent,
    CartDropdownComponent,
    CheckoutComponent,
    CategoryComponent,
    WishListDropdownComponent,
    BrandComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgImageSliderModule,
    MdbCarouselModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    MatFormFieldModule, 
    MatInputModule, 
    TextFieldModule, 
    MatButtonModule,
    MatSliderModule,
    CarouselModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
     WishListService,
    AuthService, 
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

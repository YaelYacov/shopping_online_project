import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './pages/header/header.component';
import { RegisterPanelBComponent } from './components/register-panel-b/register-panel-b.component';
import { CategoriesNavComponent } from './components/categories-nav/categories-nav.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { WhyYouShouldBuyComponent } from './components/why-you-should-buy/why-you-should-buy.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MainLogInComponent } from './pages/main-log-in/main-log-in.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ResizableModule } from 'angular-resizable-element';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { OrdersFormComponent } from './components/orders-form/orders-form.component';
import { OrderInPlaceComponent } from './components/order-in-place/order-in-place.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    HeaderComponent,
    RegisterPanelBComponent,
    CategoriesNavComponent,
    ProductCardComponent,
    HomeComponent,
    CartComponent,
    WhyYouShouldBuyComponent,
    AboutUsComponent,
    MainLogInComponent,
    OrdersComponent,
    UploadFilesComponent,
    AdminFormComponent,
    OrdersFormComponent,
    OrderInPlaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    DragDropModule,
    ResizableModule,
  ],
  providers: [
    // { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

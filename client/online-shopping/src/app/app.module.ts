import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './pages/header/header.component';
import { RegisterPanelBComponent } from './components/register-panel-b/register-panel-b.component';

@NgModule({
  declarations: [AppComponent, LogInComponent, ProductComponent, RegisterComponent, HeaderComponent, RegisterPanelBComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

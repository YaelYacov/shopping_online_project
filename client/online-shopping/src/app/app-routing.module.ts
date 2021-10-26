import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderInPlaceComponent } from './components/order-in-place/order-in-place.component';
import { RegisterPanelBComponent } from './components/register-panel-b/register-panel-b.component';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { MainLogInComponent } from './pages/main-log-in/main-log-in.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/logIn', pathMatch: 'full' },
  { path: 'registerPart1', component: RegisterComponent },
  { path: 'registerPart2', component: RegisterPanelBComponent },
  { path: 'logIn', component: MainLogInComponent },
  // { path: 'logIn', component: LogInComponent },
  { path: 'home', component: HomeComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orderInPlace', component: OrderInPlaceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

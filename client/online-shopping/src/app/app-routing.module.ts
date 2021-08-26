import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPanelBComponent } from './components/register-panel-b/register-panel-b.component';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/logIn', pathMatch: 'full' },
  { path: 'registerPart1', component: RegisterComponent },
  { path: 'registerPart2', component: RegisterPanelBComponent },
  { path: 'logIn', component: LogInComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

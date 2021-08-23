import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPanelBComponent } from './components/register-panel-b/register-panel-b.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/registerPart1', pathMatch: 'full' },
  { path: 'registerPart1', component: RegisterComponent },
  { path: 'registerPart2', component: RegisterPanelBComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

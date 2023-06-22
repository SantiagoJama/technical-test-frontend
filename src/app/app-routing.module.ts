import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AuthguardGuard } from './global-services/guard-services/authguard.guard';

const routes: Routes = [
  { path : 'sign-in', component : LoginComponent },
  { path : 'sign-up', component : SignUpComponent },
  { path: 'home', component : HomeComponent, canActivate: [AuthguardGuard], data: {
    role: 'ROLE_USER',
  }},
  { path : "", component : LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

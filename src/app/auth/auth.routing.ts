import { AuthGuardLoggedIn } from './auth-guard-logged-in.service';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthGuardLoggedIn]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardLoggedIn
  ]
})
export class AuthRoutingModule {

}
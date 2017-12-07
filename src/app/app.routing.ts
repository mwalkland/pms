import { StudentComponent } from './student/student.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  {
    path: '',
    component: StudentComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
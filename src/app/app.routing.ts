import { StaffComponent } from './staff/staff.component';
import { StudentComponent } from './student/student.component';
import { AuthComponent } from './auth/auth.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'app/auth/guards/auth-guard.service';
import { TypeGuard } from 'app/auth/guards/type-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    component: StudentComponent,
    canActivate: [AuthGuard, TypeGuard]
  },
  {
    path: 'staff',
    component: StaffComponent,
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
  providers: [
    AuthGuard,
    TypeGuard
  ]
})
export class AppRoutingModule {

}
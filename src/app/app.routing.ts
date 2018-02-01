import { StudentGuard } from './auth/guards/student-guard.service';
import { StaffComponent } from './staff/staff.component';
import { StudentComponent } from './student/student.component';
import { AuthComponent } from './auth/auth.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/guards/auth-guard.service';
import { TypeGuard } from './auth/guards/type-guard.service';
import { StaffGuard } from './auth/guards/staff-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [TypeGuard],
    pathMatch: 'full'
  },
  {
    path: 'student',
    loadChildren: 'app/student/student.module#StudentModule',
    canActivate: [AuthGuard, StudentGuard]
  },
  {
    path: 'staff',
    loadChildren: 'app/staff/staff.module#StaffModule',
    canActivate: [AuthGuard, StaffGuard]
  },
  // TODO Page not found
  {
    path: '**',
    redirectTo: ''
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
    TypeGuard,
    StudentGuard,
    StaffGuard
  ]
})
export class AppRoutingModule {

}
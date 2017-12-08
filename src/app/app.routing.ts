import { StudentGuard } from './auth/guards/student-guard.service';
import { StaffComponent } from './staff/staff.component';
import { StudentComponent } from './student/student.component';
import { AuthComponent } from './auth/auth.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'app/auth/guards/auth-guard.service';
import { TypeGuard } from 'app/auth/guards/type-guard.service';
import { StaffGuard } from 'app/auth/guards/staff-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthGuard, TypeGuard],
    pathMatch: 'full'
  },
  {
    path: 'student',
    loadChildren: 'app/student/student.module#StudentModule',
    canActivate: [StudentGuard]
  },
  {
    path: 'staff',
    loadChildren: 'app/staff/staff.module#StaffModule',
    canActivate: [StaffGuard]
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
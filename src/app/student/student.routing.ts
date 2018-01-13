import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentComponent } from './student.component';
import { AuthGuard } from './../auth/guards/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StudentProjectsComponent } from './student-projects/student-projects.component';
import { StudentStaffComponent } from './student-staff/student-staff.component';
import {
  StudentProjectsConfirmationComponent
} from './student-projects/student-projects-confirmation/student-projects-confirmation.component';

const studentRoutes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: '',
        component: StudentHomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'projects',
        component: StudentProjectsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'stafflist',
        component: StudentStaffComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'confirmation',
        component: StudentProjectsConfirmationComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(studentRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})
export class StudentRoutingModule {

}
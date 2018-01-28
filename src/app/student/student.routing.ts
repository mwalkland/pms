import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentComponent } from './student.component';
import { AuthGuard } from './../auth/guards/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StudentProjectsComponent } from './student-projects/student-projects.component';
import {
  StudentProjectsConfirmationComponent
} from './student-projects/student-projects-confirmation/student-projects-confirmation.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentMyProjectComponent } from './student-my-project/student-my-project.component';

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
        path: 'confirmation',
        component: StudentProjectsConfirmationComponent
      },
      {
        path: 'create',
        component: StudentCreateComponent
      },
      {
        path: 'my-project',
        component: StudentMyProjectComponent
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
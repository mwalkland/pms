import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StudentProjectsComponent } from 'app/student/student-projects/student-projects.component';
import { StudentStaffComponent } from 'app/student/student-staff/student-staff.component';

const studentRoutes: Routes = [
  {
    path: 'projects', component: StudentProjectsComponent
  },
  {
    path: 'stafflist', component: StudentStaffComponent
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
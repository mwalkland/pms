import { AuthGuard } from './../auth/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const staffRoutes: Routes = [

]

@NgModule({
  imports: [
    RouterModule.forChild(staffRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})
export class StaffRoutingModule {

}
import { LogoutDialogComponent } from './logout/logout-dialog/logout-dialog.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AuthRoutingModule } from './auth.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatRadioModule,
  MatDialogModule,
  MatListModule
} from '@angular/material';
import { LogoutComponent } from './logout/logout.component';
import { ExpiredComponent } from './expired/expired.component';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    AuthRoutingModule,
    MatDialogModule,
    MatListModule
  ],
  exports: [
    AuthComponent,
    LogoutComponent
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    LogoutDialogComponent,
    ExpiredComponent
  ],
  providers: [
    AuthGuard
  ],
  entryComponents: [
    LogoutDialogComponent,
    ExpiredComponent
  ]
})
export class AuthModule { }